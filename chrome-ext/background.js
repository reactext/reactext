let connections = {};

//this is an array of objects that hold the tab's new instance
let instances = [];
//this is an array of objects that hold all unique states 
let uniqueStates = [];
let changesToState;
let reload = false;

//This listens for a chrom.runtime.onConnect to be fired
chrome.runtime.onConnect.addListener(port => {

    const extensionListener = (msg, sender, res) => {
        console.log('extension listener in background fired', msg);

        //when a devTool is opened, this function adds a tab info to the conections object
        if (msg.name == 'connectBackAndDev') {
            console.log('making connection');
            connections[msg.tabId] = port;
        }
        if (uniqueStates.length > 0) {
            let firstState = uniqueStates.slice().shift();
            notifyDevtools(connections[msg.tabId], firstState)
        }
    }

    //listens for port.sendMessage
    port.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(msg => {

        port.onMessage.removeListener(extensionListener);
        //loop through connections object and find delete disconnected tab
        let tabs = Object.keys(connections);
        for (let i = 0; i < tabs.length; i++) {
            if (connections[tabs[i]] == port) {
                delete connections[tabs[i]];
                break;
            }
        }
    });
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
    if (msg.from === 'content_script' && msg.data) {
        message = msg.data;

        let tabId = sender.tab.id;

        if (reload) {
            //reset all instances, uniqueStates, and changesToState on reload
            instances = [];
            uniqueStates = [];
            reload = false;
            notifyDevtools(connections[tabId], message);
        }

        //compare instances changes
        if (uniqueStates.length > 0) {
            let prev = uniqueStates[uniqueStates.length - 1];
            let curr = message;
            changesToState = findChanges(prev, curr)
            if (Object.keys(changesToState).length > 1) {
                notifyDevtools(connections[tabId], changesToState);
                uniqueStates.push(message)
            }
        }

        if (uniqueStates.length === 0) uniqueStates.push(message);
        instances.push(message);

        //message object from content_script is stored to state array
        console.log(instances, '<----this instances array is growing')
        console.log('unique', uniqueStates)
    };

    if (msg.from === 'content_script' && msg.name === 'srcCodeChanged') {
        reload = true;
        console.log('insdeeeeee 148 background, src code Changed', reload)
    }
    return true;
});