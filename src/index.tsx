import React from 'react';
import ReactDOM from 'react-dom/client';
import L from 'leaflet';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "leaflet/dist/leaflet.css";
import './index.css';

// NOTE: Marker icon does not work out of box
L.Icon.Default.imagePath='leaflet_images/';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// NOTE: StrictMode while in develop phase 
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

