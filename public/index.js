import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

let initialState;
let stateChanges = [];

chrome.runtime.onMessage.addListener(msg => {
    console.log(msg, '<-- msg');
    //listens for post Message on port
    console.log('INSIDEEEEEE STATE CHANGE 12 here is initialState', initialState)

    if (msg.name === 'sendData') {
        // Received message from devtools.
        console.log('Received message from INDEX page', msg);
        initialState = msg.initState;
        renderApp(initialState, stateChanges)
    }
    if (msg.name === 'stateChanges') {
        console.log('Received message in INDEX MSG === stateChanges page', msg.stateChanges);
        //delete stateHasChanged property in msg.stateChanges
        delete msg.stateChanges.stateHasChanged;
        stateChanges.push(msg.stateChanges);
        renderApp(initialState, stateChanges)
    }
});

function renderApp(prop1, prop2) {
    console.log('in render app', prop2)
    render(
        <App initState={prop1} stateChanges={prop2} />
        , document.getElementById('container')
    )
}