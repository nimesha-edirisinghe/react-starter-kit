import type { AxiosInstance } from 'axios';

export const attachRequestInterceptor = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};
