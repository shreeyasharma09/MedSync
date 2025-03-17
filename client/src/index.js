import React from 'react';
import ReactDOM from 'react-dom/client'; // Change import path
import './index.css';
import App from './components/App';

import * as serviceWorker from './serviceWorker';

// Create a root using the createRoot API
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
