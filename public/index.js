import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

console.log('inside index.js render', App)

render(
    <App />
    , document.getElementById('container')
)