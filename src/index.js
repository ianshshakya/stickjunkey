import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ColorProvider, { ColorContext } from './Contexts/ColorContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ColorProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ColorProvider>
);


