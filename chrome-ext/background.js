//NOTES:
// this script runs in the background as soon a chrome is loaded.
// to see the console for this script you must go to the chrome
//extension page and click 'Inspect views backgroundpage'
console.log('background.js ran!!!');
let message = {
    "txt":"im from the background.js fo"
}
chrome.runtime.sendMessage(3460,message);