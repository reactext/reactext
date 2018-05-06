

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
  let state = message.detail;
  chrome.runtime.sendMessage({ data: state, from: 'content_script'});
}, false);

window.addEventListener("beforeunload", function (e) {
  console.log('innnnn window beforeUnload listener')
  chrome.runtime.sendMessage({ name: 'srcCodeChanged', from: 'content_script'});
  // var confirmationMessage = "\o/";
  // e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
  // return 'hiiii';              // Gecko, WebKit, Chrome <34
});