import React from 'react';
import ReactDOM from 'react-dom';

//load all React components
let components = {};
components.Hello = require('./views/Hello.js').default;

// render React components
let contentDiv = document.getElementById('content');
let componentName = contentDiv.getAttribute('component');
let Component = components[componentName];
ReactDOM.render(<Component/>, contentDiv);