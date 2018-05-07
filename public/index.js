import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

let modState;

console.log(window, "winnnsooooq inf indexxx");

if (window.a) console.log('hieghiehwgiehgie', window.a());

chrome.runtime.onMessage.addListener(msg => {
    console.log(msg, '<-- msgggggg');

    if (msg.name === 'sendData' || msg.name === 'sendUpdate') {
        // Received message from devtools.
        console.log('Received message from INDEXXXXXXX page', msg);
        let initialState = msg.initState;
        let stateChanges = [];
        console.log('state changesss line 26', stateChanges);
        renderApp(initialState, stateChanges, modState)
    }
    else if (msg.name === 'stateChanges') {
        console.log('Received message in INDEXXXXX MSG === stateChanges page', msg.stateChanges);
        //delete stateHasChanged property in msg.stateChanges
        // delete msg.stateChanges.stateHasChanged;
        let stateChanges = msg.stateChanges;
        let initialState = msg.initState;
        console.log('state changesse line 35', stateChanges);
        renderApp(initialState, stateChanges, modState)
    }
    // else if (msg.name ==='compAdded') {
    //     // Received message from background.
    //     console.log('Received message from INDEXXXXXXX page 31', msg);
    //     modState = msg.initState;
    //     console.log('state changesss line 42', stateChanges);
    //     renderApp(initialState, stateChanges, modState)
    // }
    // else if (msg.name === 'sendUpdate') {
    //     // Received message from devtools.
    //     console.log('Received message from INDEXXXXXXX page', msg);
    //     let initialState = msg.initState;
    //     stateChanges = [];
    //     console.log('state changesss line 51', stateChanges);
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