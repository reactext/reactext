import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

let renderApp = function renderApp(prop1, prop2, prop3) {
    console.log('PROPs render app PROP!!!!', prop1, prop2, prop3)
    return render(
        <App initState={prop1} stateChanges={prop2} modState={prop3}/>
        , document.getElementById('container')
    )
}

function addMethod(window, func) {
    return window.renderFunc = func;
}

addMethod(window, renderApp);

