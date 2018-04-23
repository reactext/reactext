//NOTES:
// This script runs as soon as page is loaded in Chrome.
// Its console is the actual devtools console.
// This script will interact with the actual live tab content.
//need to build the script tag and inject script into active page here that runs hook stuff
console.log('content.js')
chrome.runtime.onMessage.addListener((message, sender, func) =>{
    console.log('im the func', func);
    console.log('im the message: ', message);
    console.log('im the sender: ', sender);
});
let injectScript = (appendTo, path) => {
    let script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', path);
    document.querySelector(appendTo).appendChild(script);
}

injectScript('body', chrome.runtime.getURL('/hook.js'));



