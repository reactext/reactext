import React from 'react';
import { render } from 'react-dom';
// import Context from './Context.jsx';
import App from './App.jsx';

// chrome.runtime.onConnect.addListener(port => {
//     // alert('eighewigheii Hi Luis!')
//     console.log(port, '<-- im the PORT PORT PORT PORT port');

//     //listens for post Message on port (i.e. devtools.js)
//     port.onMessage.addListener(msg => {
//         console.log('MESAGGGGGEEE', msg)
//         if (msg.name === 'sendData') {
//             console.log('Received message from INDEXXXXXXX page', msg);

//             render(
//                 // <Context.Provider>
//                 <App initState={msg.initState} />
//                 // </Context.Provider>
//                 , document.getElementById('container')
//             )
//         }
//     });
// });

chrome.runtime.onMessage.addListener(msg => {
    console.log('MESAGGGGGEEE', msg)
    if (msg.name === 'sendData') {
        console.log('Received message from INDEXXXXXXX page', msg);

        render(
            // <Context.Provider>
            <App initState={msg.initState} />
            // </Context.Provider>
            , document.getElementById('container')
        )
    }
});

console.log(window, 'this is the windowwwwww')

