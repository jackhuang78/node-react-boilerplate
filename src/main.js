import React from 'react';
import ReactDOM from 'react-dom';

//load all React components
var components = {};
components.Hello = require('./views/Hello.js').default;

// render React components
var contentDiv = document.getElementById('content');
var componentName = contentDiv.getAttribute('component');
var Component = components[componentName];


ReactDOM.render(<Component/>, contentDiv);