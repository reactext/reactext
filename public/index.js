import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

let initialState;
let modState;
let stateChanges = [];

console.log(window, "winnnsooooq inf indexxx");

chrome.runtime.onMessage.addListener(msg => {
    console.log(msg, '<-- msgggggg');
    //listens for post Message on port
    // console.log('INSIDEEEEEE STATE CHANGE 12 here is initialState', initialState)

    if (msg.name === 'sendData') {
        // Received message from devtools.
        console.log('Received message from INDEXXXXXXX page', msg);
        initialState = msg.initState;
        stateChanges = [];
        renderApp(initialState, stateChanges, modState)
    }
    if (msg.name === 'stateChanges') {
        console.log('Received message in INDEXXXXX MSG === stateChanges page', msg.stateChanges);
        //delete stateHasChanged property in msg.stateChanges
        delete msg.stateChanges.stateHasChanged;
        stateChanges.push(msg.stateChanges);
        renderApp(initialState, stateChanges, modState)
    }
    if (msg.name ==='compAdded') {
        // Received message from background.
        console.log('Received message from INDEXXXXXXX page 31', msg);
        modState = msg.initState;
        renderApp(initialState, stateChanges, modState)
    }

    // if (msg.from === 'srcCodeChanged') {
    //     // Received message from devtools.
    //     console.log('Received message from INDEXXXXXXX page', msg);
    //     initialState = msg.data.data;
    //     stateChanges = [];
    //     renderApp(initialState, stateChanges, modState)
    // }
});

function renderApp(prop1, prop2, prop3) {
    console.log('PROP 1 in render app PROP!!!!', prop1)
    console.log('PROP 2 in render app', prop2)
    console.log('PROP 3 in render app', prop3)
    render(
        <App initState={prop1} stateChanges={prop2} modState={prop3}/>
        , document.getElementById('container')
    )
}