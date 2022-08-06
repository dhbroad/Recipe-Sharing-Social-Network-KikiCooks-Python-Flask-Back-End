import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // This was included by default by React when we did npx create-react-app, but we can also import our own css file in other .js files the same way
import App from './App'; // the first App is the function "App" from the App.js file
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'; // We had to import this manually because we want to use BrowserRouter (as Router)

ReactDOM.render( // first parameter is what you want to render, the second parameter is where it is.
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
