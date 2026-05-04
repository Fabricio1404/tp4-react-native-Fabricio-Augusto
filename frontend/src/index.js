import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { JugadoresProvider } from './context/JugadoresContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <JugadoresProvider>
      <App />
    </JugadoresProvider>
  </React.StrictMode>
);
