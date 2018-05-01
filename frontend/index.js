import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

console.log('inside index.js render')

render(
    // wrap the App in the Provider and pass in the store
    <App />
    , document.getElementById('container')
)