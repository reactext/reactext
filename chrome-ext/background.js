let connections = {};

//this is an array of objects that hold the tab's new state
let state = [];

//This listens for a chrom.runtime.onConnect to be fired
chrome.runtime.onConnect.addListener( port => {
    console.log(port, '<-- im the port');
    console.log(connections, '<-- im the connections');

    //listens for post Message on port (i.e. devtools.js)
    port.onMessage.addListener( msg => {
        // Received message from devtools. Do something:
        console.log('Received message from devtools page', msg);
        console.log('port in addListener line 21', port);

        //when a devTool is opened, this function adds a tab info to the conections object
        const addActiveTabToConnections = msg => {
            if (msg.name == 'connect' && msg.tabId) {
                connections[msg.tabId] = port;
                return;
            }
        }

        addActiveTabToConnections(msg);
    });

    port.onDisconnect.addListener( msg => {
        //loop through connections object and find delete disconnected tab
        let portIds = Object.keys(connections);
        for (let i = 0; i < portIds.length; i++) {
            if (portIds[i] === msg.name) {
            // if (connections[portIds[i]] == port) {
                delete connections[portIds[i]];
                break;
            }
        }
    })

    console.log('NEW STATEEEEE!!!!', state[state.length - 1]);
    notifyDevtools(port, JSON.stringify(state[state.length - 1]));
});

// Function to send a message to all devtools.html views:
function notifyDevtools(port, msg) {
    console.log('msg inside of notifyDevTools line 46', port)
    console.log('msg inside of notifyDevTools line 47', msg)
    port.postMessage(msg);
}

//the following API receives a message from the content script
//a message is sent from hook.js -> content_script.js -> background.js EVERY TIME the page's state changes
chrome.runtime.onMessage.addListener(function (msg, sender, res) {
    console.log(res, '<reponse ------->')
    // validate we are listening for the correct msg
    if (msg.from === 'content_script') {
        message = msg.data;
        //message object from content_script is pushed to state array
        state.push(message);
        console.log(state, '<----this state array is growing')
    }
});
