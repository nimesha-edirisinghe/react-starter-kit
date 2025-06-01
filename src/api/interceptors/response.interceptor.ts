import type { AxiosInstance } from 'axios';
import log from '~/utils/log';

export const attachResponseInterceptor = (api: AxiosInstance) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;

      if (typeof window !== 'undefined') {
        if (status === 401 || status === 403) {
          log.warn('Redirecting to login...');
        }
      }

      return Promise.reject(error);
    }
  );
};
