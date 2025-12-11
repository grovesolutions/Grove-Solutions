import React from 'react';
import ReactDOM from 'react-dom/client';
import './lineicons.css';
import './index.css';
import App from './App';
import { initializeFirebase } from './backend';

// Initialize Firebase on app load
initializeFirebase().then(() => {
  console.log('Firebase initialized successfully');
}).catch((error) => {
  console.error('Firebase initialization error:', error);
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);