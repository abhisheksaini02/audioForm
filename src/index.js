import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const renderWidget = (elementId) => {
  const root = ReactDOM.createRoot(document.getElementById(elementId));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Expose the render function globally
window.MyWidget = {
  render: renderWidget
};
