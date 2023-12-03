import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//after installing with "npm install bootstrap" we import the bootstrap css below
import 'bootstrap/dist/css/bootstrap.min.css'
//Custom Bootstrap
//import './components/Bootstrap/Bootstrap.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);