
console.log('panel.js here !!!');
// let storage = {};


const addListeners = () => {
    document.querySelector('#greeting').addEventListener('click', () => console.log("greeting clicked"));
    document.querySelector('#reset').addEventListener('click', () => console.log("greeting clicked"));
};

function sendMessage() {
    //port is an object that allows two-way communication with other pages
    //attempts to connect to connect listeners within an extension (background page)

    let port = chrome.runtime.connect({
        name: chrome.runtime.id,
    });
    addListeners();
    // .postMessage sends a message to the other end of the port
    port.postMessage({
        name: 'connect',
        tabId: chrome.devtools.inspectedWindow.tabId,
    });
}

document.addEventListener("DOMContentLoaded", () => {
    console.log('in panel.js, DOMContentLoaded')
    sendMessage()
});