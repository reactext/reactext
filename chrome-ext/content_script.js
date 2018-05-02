console.log('content_script.js');


function injectScript(file, body) {
  const windowBody = document.getElementsByTagName(body)[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file);
  windowBody.appendChild(script);
}

injectScript(chrome.runtime.getURL('/hook.js'), 'body');

//ADD an eventListener that listens for Reactext event from hook.js and has a callback that sends a message to background.js
window.addEventListener("ReacText", (message) => {
  //message coming in well here.
  // console.log('in contentScript, message!!!!!!!!:', message);
  let state = message.detail;
  chrome.runtime.sendMessage({ data: state, from: 'content_script'});
}, false);