//NOTES:
// This script runs as soon as page is loaded in Chrome.
// Its console is the actual devtools console
console.log('content.js')

let hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
console.log(hook, 'here is the hook from the content script <----');