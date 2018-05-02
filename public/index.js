import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

chrome.runtime.onMessage.addListener(msg => {
    console.log('MESAGGGGGEEE', msg)
    if (msg.name === 'sendData') {
        console.log('Received message from INDEXXXXXXX page', msg);

        render(
            <App initState={msg.initState} />
            , document.getElementById('container')
        )
    }
});

console.log(window, 'this is the windowwwwww')

