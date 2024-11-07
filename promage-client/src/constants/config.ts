declare global {
  interface Window {
    env?: {
      REACT_APP_BACKEND_URL?: string;
    };
  }
}

export const REACT_APP_BACKEND_URL: string | undefined = process.env.REACT_APP_BACKEND_URL ?? window.env?.REACT_APP_BACKEND_URL;
