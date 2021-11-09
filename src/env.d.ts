interface ImportMetaEnv extends Readonly<Record<any, any>> {
  readonly VITE_APP_TITLE: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_RECAPTCHA_KEY: string;
  readonly VITE_SENTRY: string;
  readonly VITE_GOOGLE_ANALYTICS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
