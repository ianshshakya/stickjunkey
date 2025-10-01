import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ColorProvider, { ColorContext } from './Contexts/ColorContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ColorProvider>
  <React.StrictMode>
    <GoogleOAuthProvider clientId='324503486981-ubpg4rp17j6ldi9imj60i22f1pp2sut6.apps.googleusercontent.com'><App /></GoogleOAuthProvider>
    
  </React.StrictMode>
  </ColorProvider>
);


