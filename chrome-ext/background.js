let connections = {};

//this is an array of objects that hold the tab's new state 
let state = [];

//This listens for a chrom.runtime.onConnect to be fired
chrome.runtime.onConnect.addListener(function (port) {
    console.log(port, '<-- im the port');
    console.log(connections, '<-- im the connections');

    // Remove port when devtools is closed
    // port.onDisconnect.addListener(function () {
    //     var i = ports.indexOf(port);
    //     if (i !== -1) ports.splice(i, 1);
    // });

    //listens for post Message on port (i.e. devtools.js)
    port.onMessage.addListener(function (msg) {
        // Received message from devtools. Do something:
        console.log('Received message from devtools page', msg);
        console.log('port in addListener line 21', port);

        //
        const extensionListener = msg => {
            if (msg.name == 'connect' && msg.tabId) {
                connections[msg.tabId] = port;
                return;
            }
        }

        extensionListener(msg);
    });
    console.log('NEW STATEEEEE!!!!', state[state.length - 1]);
    notifyDevtools(JSON.stringify(state[state.length - 1]));
});

// Function to send a message to all devtools.html views:
function notifyDevtools(msg) {
    ports.forEach(function (port) {
        port.postMessage(msg);
    });
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