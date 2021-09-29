import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import App from './App';
import './theme/main.scss';
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY}>
      <Router>
        <App />
      </Router>
    </GoogleReCaptchaProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
