import type { AxiosInstance } from 'axios';

export const attachResponseInterceptor = (api: AxiosInstance) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;

      if (typeof window !== 'undefined') {
        if (status === 401 || status === 403) {
          console.warn('Redirecting to login...');
          // Optional: window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );
};
