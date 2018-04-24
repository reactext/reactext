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