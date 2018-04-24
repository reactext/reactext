console.log('content.js here !!!');
console.log("innnnn content_script.js");

function injectScript(file, body) {
  const windowBody = document.getElementsByTagName(body)[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file);
  windowBody.appendChild(script);
}

injectScript(chrome.runtime.getURL('/hook.js'), 'body');

var state;

//ADD an eventListener that listens for Reactext event from hook.js and has a callback that sends a message to ?
window.addEventListener("ReacText", (message) => {
  console.log('in contentScript, message:', message);
  state = message.detail;
  chrome.runtime.sendMessage({ data: state, from: 'content_script'});
}, false);