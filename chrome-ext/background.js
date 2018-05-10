//this is an object of objects that hold all active ports
let connections = {};
//this is an object of objects that hold all temp initial state sent in from content_script.js
let tempStateStorage = {};

//********* helper functions ***********//

//creates a port obj that is stored in connections
const createPortObj = (id, port, obj) => {
    connections[id] = {
        'port': port,
        'uniqueStates': [obj[id]],
        'reload': false,
        'changesToState': [],
        'instances': []
    };
    delete obj[id];
}

//sends a message to a specific port:
const notifyDevtools = (port, msg) => {
    port.postMessage(msg);
}

//This listens for a chrome.runtime.onConnect to be fired
chrome.runtime.onConnect.addListener(port => {

    const extensionListener = (msg, sender, res) => {
        //when a devTool is opened, this function all related tab info to the conections object from the tempStateStorage
        if (msg.name == 'connectBackAndDev') {
            let id = msg.tabId;
            if (!connections[id]) {
                createPortObj(id, port, tempStateStorage);
            }
            let connectMsg = {
                name: 'sendingHistory',
                tab: id,
                init: connections[id].uniqueStates[0].data,
                changes: connections[id].changesToState
            }
            notifyDevtools(port, connectMsg);
        }
    }
   
    //listens for port.sendMessage
    port.onMessage.addListener(extensionListener);
});

const findChanges = (prev, curr) => {

    let objOfChanges = { stateHasChanged: true };
    let prevKeys = Object.keys(prev.data);// prev.data is parent obj. prevKeys is component names
    const checkObj = Object.assign({}, curr.data); // object used to test if new components exist

    for (let i = 0; i < prevKeys.length; i++) {
        let prevStateProps = prev.data[prevKeys[i]].state; // prevStateProps is the state object for the component.
        let currStateProps;

        if (curr.data[prevKeys[i]]) {
            currStateProps = curr.data[prevKeys[i]].state;  // same as prevStateProps but for current state.
            if (prevStateProps !== currStateProps) { // This is filtering out the nulls and components that disappeared
                let stateKeys = Object.keys(prevStateProps);
                for (let j = 0; j < stateKeys.length; j++) {
                    if (prevStateProps[stateKeys[j]] !== currStateProps[stateKeys[j]]) {

                        let changedComp = prevKeys[i];
                        let change = [stateKeys[j], prevStateProps[stateKeys[j]], currStateProps[stateKeys[j]]]
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
    let tabId = sender.tab.id;
    // validate we are listening for the correct msg
    if (msg.from === 'content_script' && msg.name === 'initialState') {
        message = msg.data;
        if (connections[tabId]) {
            if (connections[tabId].reload) {
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
                notifyDevtools(connections[tabId].port, reloadMsg);
            }
        }
        tempStateStorage[tabId] = message;
    }

    if (msg.from === 'content_script' && msg.name === 'changedState') {
        message = msg.data;
        let prev = connections[tabId].uniqueStates[connections[tabId].uniqueStates.length - 1];
        let curr = message;
        let newChanges = findChanges(prev, curr);

        if (Object.keys(newChanges).length > 1) {
            connections[tabId].changesToState.push(newChanges);
            let changedMsg = {
                name: 'stateHasChanged',
                init: connections[tabId].uniqueStates[0].data,
                changes: connections[tabId].changesToState,
            }
            notifyDevtools(connections[tabId].port, changedMsg);
            connections[tabId].uniqueStates.push(message)
        }
        connections[tabId].instances.push(message);
    }

    if (msg.from === 'content_script' && msg.name === 'srcCodeChanged') {
        connections[tabId].reload = true;
    }
});