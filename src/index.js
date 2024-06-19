import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const renderWidget = (elementId) => {
  ReactDOM(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById(elementId)
  );
};

// Expose the render function globally
window.MyWidget = {
  render: renderWidget
};
