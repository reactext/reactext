// const connections = {};

// //Listeners for the background to communicate with the devtool 

// chrome.runtime.onConnect.addListener(devtoolsConnections => {
//   console.log('connected to addListener devltoolsconnections')
//   const devToolsRequest = (message, sender, response) => {
//     chrome.tabs.executeScript(message.tabId, { file: 'content_script.js'});
//   }
//   devtoolsConnections.onMessage.addListener(devToolsRequest);
//   devtoolsConnections.onDisconnect.addListener(() => {
//     devtoolsConnections.onMessage.removeListener(devToolsRequest);
//   });
// });

// chrome.runtime.onConnect.addListener(port => {
//   var extensionListener = (message, sender, response) => {
//     if (message.name == 'connect' && message.tabId) {
//       chrome.tabs.sendMessage(message.tabId, message);
//       connections[message.tabId] = port;
//       return;
//     }
//   }

//   //listening to messages sent from panel.js; fired when postMessage
//   port.onMessage.addListener(extensionListener);

//   // to clean up data with disconnect
//   port.onDisconnect.addListener(function(port) {
//     port.onMessage.removeListener(extensionListener)

//     let tabs = Object.keys(connections)
//     for (let i = 0; i < tabs.length; i++) {
//       if (connections[tabs[i] == port]) {
//         delete connections[tabs[i]]
//         break;
//       }
//     }
//   })
// });

// chrome.runtime.onMessage.addListener(function (req, sender, res) {
//   if (sender.tab) {
//     let tabId = sender.tab.id;
//     if (tabId in connections) {
//       chrome.pageAction.show(tabId);
//       connections[tabId].postMessage(req)
//     } else {
//       chrome.pageAction.hide(tabId);
//       console.log('Cannot find the tab!');
//     }
//   } else {
//     console.log('Sender.tab is undefined');
//   }
//   return true;
// });
