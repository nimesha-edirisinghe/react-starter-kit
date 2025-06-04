import type { AxiosInstance } from 'axios';
import { useAuthStore } from '~/features/auth/store/auth-store';

export const attachRequestInterceptor = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined') {
        const { token } = useAuthStore.getState();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};
