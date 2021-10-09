import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import App from './App';
import './theme/main.scss';
import { Router } from 'react-router-dom';
import history from './helpers/history';
ReactDOM.render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY}>
      <Router history={history}>
        <App />
      </Router>
    </GoogleReCaptchaProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
