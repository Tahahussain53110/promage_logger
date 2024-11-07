import axios, { AxiosResponse } from 'axios';

import { REACT_APP_BACKEND_URL } from '../constants/config';
import { notifyError } from '../utils/toast';

const instance = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setInterceptors = () => {
  instance.interceptors.response.use(
    (response: AxiosResponse<any>) => {
      if (response.config && response.config.method) {
        console.info(`[AXIOS]: ${response.config.method.toUpperCase()}:${response.config.url}`, {
          config: response.config,
          data: response.data,
        });
      }
      return response; // Return the AxiosResponse
    },
    async (error) => {
      const resp = error.response || error;
      const data = resp.data || resp;
      if (resp.status >= 400 && resp.status < 500) {
        notifyError(resp.data);
      }
      return Promise.reject({ success: false, status: resp.status, data });
    }
  );
};

export { setInterceptors };
export default instance;
