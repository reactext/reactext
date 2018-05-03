
import React from 'react';

console.log('inside context.js')

let initialState;

chrome.runtime.onConnect.addListener(port => {
    console.log(port, '<-- im the port');
    //listens for post Message on port (i.e. devtools.js)
    port.onMessage.addListener(msg => {
        if (msg.name === 'sendData') {
            // Received message from devtools. Do something:
            console.log('Received message from INDEXXXXXXX page', msg);
            console.log('port in addListener line 13 in INDEXXXXXX', port);
            initialState = msg.data;
            console.log(initialState, '<------ im initial stateeeee')

        }
    });
});

const Context = React.createContext(initialState);

export default Context;

