var ports = [];
chrome.runtime.onConnect.addListener(function(port) {
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
    notifyDevtools('this is our data');
});
// Function to send a message to all devtools.html views:
function notifyDevtools(msg) {
    ports.forEach(function(port) {
        port.postMessage(msg);
    });
}

chrome.runtime.onMessage.addListener(function (msg, sender) {
    // First, validate the message's structure
    if (msg.from === 'content_script') {
      // Enable the page-action for the requesting tab
      console.log('in listener background.js.....', msg.data)
    }
  });

