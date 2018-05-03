let connections = {};

//this is an array of objects that hold the tab's new state
let state = [];
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

    notifyDevtools(port, state[state.length - 1]);

});

// Function to send a message to all devtools.html views:
function notifyDevtools(port, msg) {
    port.postMessage(msg);
}

function sendStateChanges(port, msg) {
    port.postMessage(msg);
}

//the following API receives a message from the content script
//a message is sent from hook.js -> content_script.js -> background.js EVERY TIME the page's state changes
chrome.runtime.onMessage.addListener(function (msg, sender, res) {
    console.log('inputs in background.js line 61 chrome runtime listener', 'msg:', msg, sender, res)
    // validate we are listening for the correct msg
    if (msg.from === 'content_script') {

        let tabId = sender.tab.id;

        message = msg.data;

        //compare state changes

        if (state.length > 0) {
            let prev = state[state.length - 1];
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
            console.log(changesToState, '<--------------------------this is changing');
            console.log(connections, 'connections--------->')
            console.log(connections[tabId], 'connections[tab]---------->')

            console.log('beffore sendStateChanges changesToState', changesToState);
            sendStateChanges(connections[tabId], changesToState);
        }

        //message object from content_script is stored to state array
        state.push(message);
        console.log(state, '<----this state array is growing')
    };
});