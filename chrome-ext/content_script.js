console.log("innnnn content_script.js");

function injectScript(file, body) {
    const windowBody = document.getElementsByTagName(body)[0];
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file);
    windowBody.appendChild(script);
  }
  
  injectScript(chrome.runtime.getURL('/hook.js'), 'body');

//   window.addEventListener('message', (event) => {
//     if (event.source !== window) 
//     return;
//   });
  
// //.sendMessage sends a single message to event listeners within your exentension

//   window.addEventListener("Reactext", (message) => {
//     chrome.runtime.sendMessage({ data: message.detail });
//   }, false);
  
//   // send message to devtools? on page refresh
//   window.addEventListener("beforeunload", function() {
//     chrome.runtime.sendMessage({ refresh: "true" });
//   }, false);
  