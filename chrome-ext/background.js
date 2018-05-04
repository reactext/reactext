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
        console.log('port in addListener line 21', port);


        //when a devTool is opened, this function adds a tab info to the conections object
        const addActiveTabToConnections = msg => {
            if (msg.name == 'connect' && msg.tabId) {
                console.log('messssssgg in addActive', msg)
                console.log('heeeeyeyyyy i in backgrounddddd')
                connections[msg.tabId] = port;
                return;
            }
        }
        if (!connections[msg.tabId]) {
            addActiveTabToConnections(msg)
        } else {
            console.log('already logged')
        }
    });

    port.onDisconnect.addListener(msg => {
        //loop through connections object and find delete disconnected tab
        let portIds = Object.keys(connections);
        for (let i = 0; i < portIds.length; i++) {
            if (portIds[i] === msg.name) {
                // if (connections[portIds[i]] == port) {
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

//the following API receives a message from the content script
//a message is sent from hook.js -> content_script.js -> background.js EVERY TIME the page's has an instance firedstate
chrome.runtime.onMessage.addListener(function (msg, sender, res) {
    console.log('inputs in background.js line 61 chrome runtime listener', 'msg:', msg, sender, res)
    // validate we are listening for the correct msg
    if (msg.from === 'content_script') {

        let tabId = sender.tab.id;

        message = msg.data;

        //compare instances changes
        if (uniqueStates.length > 0) {
            let prev = uniqueStates[uniqueStates.length - 1];
            let curr = message;

            const findChanges = (prev, curr) => {

                let objOfChanges = { stateHasChanged: true };

                let prevKeys = Object.keys(prev.data);// prev.data is parent obj. prevKeys is component names
                let currKeys = Object.keys(curr.data); // same as prev.data but for current state

                for (let i = 0; i < prevKeys.length; i++) {
                    let prevStateProps = prev.data[prevKeys[i]].state; // prevStateProps is the state object for the component.
                    let currStateProps = curr.data[prevKeys[i]].state; // same as prevStateProps but for current state.

                    if (prevStateProps !== currStateProps) { // This is filtering out the nulls.
                        let stateKeys = Object.keys(prevStateProps)
                        for (let j = 0; j < stateKeys.length; j++) {
                            if (prevStateProps[stateKeys[j]] !== currStateProps[stateKeys[j]]) {
                                let changedComp = prevKeys[i];
                                objOfChanges[changedComp] = { propName: stateKeys[j], prev: prevStateProps[stateKeys[j]], curr: currStateProps[stateKeys[j]] }
                            }
                        }
                    }
                }
                return objOfChanges;
            }
            changesToState = findChanges(prev, curr)
            if (Object.keys(changesToState).length > 1) {
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