let connections = {};

//this is an array of objects that hold the tab's new instance
let instances = [];
//this is an array of objects that hold all unique states 
let uniqueStates = [];
let changesToState;

//This listens for a chrom.runtime.onConnect to be fired
chrome.runtime.onConnect.addListener(port => {

    //listens for post Message on port (i.e. devtools.js)
    port.onMessage.addListener(msg => {
        // Received message from devtools.
        console.log('post message fired', msg);
        // console.log('port in addListener line 21', port);


        //when a devTool is opened, this function adds a tab info to the conections object
        const addActiveTabToConnections = msg => {
            if (msg.name == 'connect' && msg.tabId) {
                connections[msg.tabId] = port;
                return;
            }
        }
        if (!connections[msg.tabId]) {
            addActiveTabToConnections(msg);

        } else {
            console.log('already logged')
        }

        console.log(port, 'PORRRRRRRRRRRRT')

    });

    port.onDisconnect.addListener(msg => {
        //loop through connections object and find delete disconnected tab
        let portIds = Object.keys(connections);
        for (let i = 0; i < portIds.length; i++) {
            if (portIds[i] === msg.name) {
                delete connections[portIds[i]];
                break;
            }
        }
    });

    notifyDevtools(port, uniqueStates[uniqueStates.length - 1]);

});

// Function to send a message to all devtools.html views:
function notifyDevtools(port, msg) {
    port.postMessage(msg);
}

function sendStateChanges(port, msg) {
    port.postMessage(msg);
}

function sendUpdatedCode(msg) {
    console.log('object has been changeddddd - MAYDAY SOMETHING DELETED!!!', msg)
    chrome.runtime.sendMessage({ name: 'srcCodeChange', initState: msg.data.data });
    uniqueStates = []
    instances = []
    return 'user changed code';
}

//the following API receives a message from the content script
//a message is sent from hook.js -> content_script.js -> background.js EVERY TIME the page's has an instance firedstate
chrome.runtime.onMessage.addListener(function (msg, sender, res) {
    console.log('inputs in background.js line 61 chrome runtime listener', 'msg:', msg, sender, res)
    // validate we are listening for the correct msg
    if (msg.from === 'content_script') {
        console.log(msg.data, 'im the msg.data');

        let tabId = sender.tab.id;

        message = msg.data;

        //compare instances changes
        if (uniqueStates.length > 0) {
            let prev = uniqueStates[uniqueStates.length - 1];
            let curr = message;

            const findChanges = (prev, curr) => {

                let objOfChanges = { stateHasChanged: true };

                let prevKeys = Object.keys(prev.data);// prev.data is parent obj. prevKeys is component names
                const checkObj = Object.assign({}, curr.data); // object used to test if new components exist

                for (let i = 0; i < prevKeys.length; i++) {
                    let prevStateProps = prev.data[prevKeys[i]].state; // prevStateProps is the state object for the component.
                    let currStateProps;

                    //INCORRECT
                    if (!curr.data[prevKeys[i]]) return sendUpdatedCode(msg);

                    if (curr.data[prevKeys[i]]) {
                        currStateProps = curr.data[prevKeys[i]].state;  // same as prevStateProps but for current state.
                        console.log('currSP', currStateProps)
                        console.log('prevSP', prevStateProps)
                        if (prevStateProps !== currStateProps) { // This is filtering out the nulls and components that disappeared
                            let stateKeys = Object.keys(prevStateProps);
                            console.log('STATEKEYSS', stateKeys)
                            for (let j = 0; j < stateKeys.length; j++) {
                                if (prevStateProps[stateKeys[j]] !== currStateProps[stateKeys[j]]) {
                                    
                                    let changedComp = prevKeys[i];
                                    let change = { propName: stateKeys[j], prev: prevStateProps[stateKeys[j]], curr: currStateProps[stateKeys[j]] }
                                    console.log('changedComp, ')
                                    if (objOfChanges[changedComp]) {
                                        objOfChanges[changedComp].push(change)
                                    } else {
                                    objOfChanges[changedComp] = [change];
                                    }
                                }
                            }
                        }
                    }

                    if (checkObj[prevKeys[i]]) {
                        delete checkObj[prevKeys[i]];
                    };
                }

                if (Object.keys(checkObj).length > 0) {
                    console.log('object has been changeddddd - MAYDAY SOMETHING ADDED!!!', checkObj)
                    return sendUpdatedCode(msg)
                }
                return objOfChanges;
            }

            changesToState = findChanges(prev, curr)
            console.log('CHANGESSSS TOOOO STATE', changesToState)
            if (Object.keys(changesToState).length > 1 && changesToState !== 'user changed code') {
                sendStateChanges(connections[tabId], changesToState);
                uniqueStates.push(message)
            }
        }
        //message object from content_script is stored to state array
        console.log(instances, '<----this instances array is growing')
        console.log('unique', uniqueStates)

        if (uniqueStates.length === 0) uniqueStates.push(message);
        instances.push(message);
    };
});