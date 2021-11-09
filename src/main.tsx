import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import App from './App';
import './theme/main.scss';
import { Router } from 'react-router-dom';
import history from './helpers/history';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { HelmetProvider } from 'react-helmet-async';
import ReactGA from 'react-ga';

if (import.meta.env.VITE_GOOGLE_ANALYTICS) {
  ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS);
}

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY,
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0,
});

ReactDOM.render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY}>
      <HelmetProvider>
        <Router history={history}>
          <App />
        </Router>
      </HelmetProvider>
    </GoogleReCaptchaProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
