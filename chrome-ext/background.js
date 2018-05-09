//this is an object of objects that hold all active ports
let connections = {};

//this is an object of objects that hold all temp initial state sent in from content_script.js
let tempStateStorage = {};

//This listens for a chrom.runtime.onConnect to be fired
chrome.runtime.onConnect.addListener(port => {

    const extensionListener = (msg, sender, res) => {
        console.log('extension listener in background fired', msg);

        console.log(connections, 'connections port 13')
        console.log(tempStateStorage, '<----- temp state in onConnect line 14')

        //when a devTool is opened, this function all related tab info to the conections object from the tempStateStorage
        if (msg.name == 'connectBackAndDev') {
            if (!connections[msg.tabId]) {
                connections[msg.tabId] = port;
                connections[msg.tabId].uniqueStates = [tempStateStorage[msg.tabId]];
                connections[msg.tabId].reload = false;
                connections[msg.tabId].changesToState = [];
                //this is an array of objects that hold the tab's new instance
                connections[msg.tabId].instances = [];
                delete tempStateStorage[msg.tabId]
            }
            let connectMsg = {
                name: 'sendingHistory',
                tab: msg.tabId,
                init: connections[msg.tabId].uniqueStates[0].data,
                changes: connections[msg.tabId].changesToState
            }
            notifyDevtools(port, connectMsg)
        }
    }

    //listens for port.sendMessage
    port.onMessage.addListener(extensionListener);
});

// Function to send a message to specific port:
const notifyDevtools = (port, msg) => {
    port.postMessage(msg);
}

// function sendAddedComp(msg) {
//     console.log('object has been changeddddd - MAYDAY SOMETHING DELETED!!!', msg)
//     // chrome.runtime.sendMessage({ name: 'compAdded', initState: msg.data.data });
// }

const findChanges = (prev, curr) => {

    let objOfChanges = { stateHasChanged: true };

    let prevKeys = Object.keys(prev.data);// prev.data is parent obj. prevKeys is component names
    const checkObj = Object.assign({}, curr.data); // object used to test if new components exist

    for (let i = 0; i < prevKeys.length; i++) {
        let prevStateProps = prev.data[prevKeys[i]].state; // prevStateProps is the state object for the component.
        let currStateProps;

        // if (!curr.data[prevKeys[i]]) return sendUpdatedCode(msg);

        if (curr.data[prevKeys[i]]) {
            currStateProps = curr.data[prevKeys[i]].state;  // same as prevStateProps but for current state.
            if (prevStateProps !== currStateProps) { // This is filtering out the nulls and components that disappeared
                let stateKeys = Object.keys(prevStateProps);
                console.log('STATEKEYSS', stateKeys)
                for (let j = 0; j < stateKeys.length; j++) {
                    if (prevStateProps[stateKeys[j]] !== currStateProps[stateKeys[j]]) {

                        let changedComp = prevKeys[i];
                        let change = [stateKeys[j], prevStateProps[stateKeys[j]], currStateProps[stateKeys[j]]]
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

    // if (Object.keys(checkObj).length > 0) {
    //     console.log('object has been changeddddd - SOMETHING ADDED!!!', checkObj)
    //     sendAddedComp(msg)
    // }
    return objOfChanges;
}

//the following API receives a message from the content script
//a message is sent from hook.js -> content_script.js -> background.js EVERY TIME the page's has an instance firedstate
chrome.runtime.onMessage.addListener((msg, sender, res) => {
    console.log('messagessss coming into background', msg, sender, res)
    // validate we are listening for the correct msg
    if (msg.from === 'content_script' && msg.name === 'initialState') {
        console.log('inside background ====> initialState')
        message = msg.data;
        let tabId = sender.tab.id;

        if (connections[tabId]) {
            if (connections[tabId].reload) {
                console.log('inside background ====> reload')
                //reset all instances, states, and changesToState on reload
                connections[tabId].instances = [];
                connections[tabId].uniqueStates = [message];
                connections[tabId].changesToState = [];
                connections[tabId].reload = false;
                let reloadMsg = {
                    name: 'reloadPage',
                    init: connections[tabId].uniqueStates[0].data,
                    changes: connections[tabId].changesToState,
                }
                notifyDevtools(connections[tabId], reloadMsg);
            }
        }
        console.log('tempS Before', tempStateStorage, tabId)
        tempStateStorage[tabId] = message;
        console.log('tempS After', tempStateStorage)
    }

    if (msg.from === 'content_script' && msg.name === 'changedState') {
        console.log('inside background ====> changedState')

        message = msg.data;
        let tabId = sender.tab.id;

        console.log('evkevekve background.js 135')
        let prev = connections[tabId].uniqueStates[connections[tabId].uniqueStates.length - 1];
        let curr = message;
        let newChanges = findChanges(prev, curr);

        console.log('changesToState', connections[tabId].changesToState)
        if (Object.keys(newChanges).length > 1) {
            connections[tabId].changesToState.push(newChanges);
            console.log('connections[tabId].changesToState', connections[tabId].changesToState)
            let changedMsg = {
                name: 'stateHasChanged',
                init: connections[tabId].uniqueStates[0].data,
                changes: connections[tabId].changesToState,
            }
            notifyDevtools(connections[tabId], changedMsg);
            connections[tabId].uniqueStates.push(message)
        }
        connections[tabId].instances.push(message);
    }

    if (msg.from === 'content_script' && msg.name === 'srcCodeChanged') {
        console.log('inside background ====> srcCodeChanged')
        connections[sender.tab.id].reload = true;
        console.log('insdeeeeee 148 background, src code Changed', connections[sender.tab.id].reload)
    }
});