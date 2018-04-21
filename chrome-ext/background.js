//NOTES:
// this script runs in the background as soon a chrome is loaded.
// to see the console for this script you must go to the chrome
//extension page and click 'Inspect views backgroundpage'
console.log('background.js ran!!!');

chrome.tabs.sendMessage('im from the send message');