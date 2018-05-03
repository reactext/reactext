import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

chrome.runtime.onMessage.addListener(msg => {
    console.log(msg, '<-- msgggggg');
    //listens for post Message on port

    if (msg.name === 'sendData') {
        // Received message from devtools.
        console.log('Received message from INDEXXXXXXX page', msg);
        let initialState = msg.initState;
        renderApp(initialState, )
    }
});

function renderApp(prop) {
    render(
        <App initState={prop} />
        , document.getElementById('container')
    )
}