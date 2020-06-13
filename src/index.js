import React from 'react';
import ReactDOM from 'react-dom';
import App from "./containers/pages/App";
import firebase from './config/firebase';

console.log('config firebase====>',firebase);

ReactDOM.render(<App/>,document.getElementById('root'));

