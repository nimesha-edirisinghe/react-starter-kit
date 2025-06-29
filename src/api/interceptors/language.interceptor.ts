import type { AxiosInstance } from 'axios';

export const attachLanguageInterceptor = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined') {
        const currentLanguage = localStorage.getItem('i18nextLng') || 'en';

        config.headers['Accept-Language'] = currentLanguage;
        config.headers['X-Language'] = currentLanguage;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};
