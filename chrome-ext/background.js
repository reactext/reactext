let ports = [];

//this is an array of objects that hold the tab's new state
let state = [];

//This listens for a chrom.runtime.connect to be fired
chrome.runtime.onConnect.addListener(function(port) {
    console.log(port, '<-- im the port');
    console.log(ports, '<-- im the ports');
    if (port.name !== "devtools") return;
    ports.push(port);
    // Remove port when devtools is closed
    port.onDisconnect.addListener(function() {
        var i = ports.indexOf(port);
        if (i !== -1) ports.splice(i, 1);
    });
    port.onMessage.addListener(function(msg) {
        // Received message from devtools. Do something:
        console.log('Received message from devtools page', msg);
    });
    console.log('NEW STATEEEEE!!!!', state[state.length-1].data);
    notifyDevtools(state[state.length-1]);
});

// Function to send a message to all devtools.html views:
function notifyDevtools(msg) {
    ports.forEach(function(port) {
        port.postMessage(msg);
    });
}

//the following API receives a message from the content script
//a message is sent from hook.js -> content_script.js -> background.js EVERY TIME the page's state changes
chrome.runtime.onMessage.addListener(function (msg, sender) {
    // validate we are listening for the correct msg
    if (msg.from === 'content_script') {
      message = msg.data;
      console.log(message, 'this is the message')
      //where is this message going now.
      //message object from content_script is pushed to state array
      state.push(message);
    }
  });
