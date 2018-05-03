import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

let initialState;
let stateChanges = '';

chrome.runtime.onMessage.addListener(msg => {
    console.log(msg, '<-- msgggggg');
    //listens for post Message on port

    console.log('INSIDEEEEEE STATE CHANGE 12 here is initialState', initialState)

    if (msg.name === 'sendData') {
        // Received message from devtools.
        console.log('Received message from INDEXXXXXXX page', msg);
        initialState = msg.initState;
        renderApp(initialState, stateChanges)
        console.log('INSIDEEEEEE STATE CHANGE 18 here is initialState', initialState)
    }
    // if (msg.name === 'stateChanges') {
    //     console.log('Received message in INDEXXXXX page', msg);
    //     console.log('INSIDEEEEEE STATE CHANGE 21 here is initialState', initialState)
    //     stateChanges = msg.stateChanges;
    //     renderApp(initialState, stateChanges)
    // }
});

function renderApp(prop1, prop2) {
    render(
        <App initState={prop1} stateChanges={prop2} />
        , document.getElementById('container')
    )
}