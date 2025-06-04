import type { AxiosInstance } from 'axios';
import { useAuthStore } from '~/features/auth/store/auth-store';
import log from '~/utils/log';

export const attachResponseInterceptor = (api: AxiosInstance) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;
      if (typeof window !== 'undefined') {
        if (status === 401 || status === 403) {
          useAuthStore.getState().logout();
          log.warn('Redirecting to login...');
        }
        if (status === 500) {
          log.error('Server error. Please try again later.');
        }
      }

      return Promise.reject(error);
    }
  );
};
