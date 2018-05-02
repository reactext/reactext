import React from 'react';
import { render } from 'react-dom';
// import Context from './Context.jsx';
import App from './App.jsx';
// alert('hiiiiii')
let initialState;

chrome.runtime.onConnect.addListener(port => {
    alert('eighewigheii Hi Luis!')
    console.log(port, '<-- im the PORT PORT PORT PORT port');
    let State;

    //listens for post Message on port (i.e. devtools.js)
    port.onMessage.addListener(msg => {
        if (msg.name === 'sendData') {
            // Received message from devtools. Do something:
            console.log('Received message from INDEXXXXXXX page', msg);
            initialState = msg.data;
            State = msg.data
            console.log(initialState, '<------ im initial stateeeee')
            render(
                // <Context.Provider>
                <App initState={State} />
                // </Context.Provider>
                , document.getElementById('container')
            )
        }
    });

});

console.log(initialState, '<------ im initial stateeeee beforrrreee renderrrr')
console.log(window, 'this is the windowwwwww')

window.blahblah();
