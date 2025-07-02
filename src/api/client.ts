import axios from 'axios';
import { attachRequestInterceptor } from './interceptors/request.interceptor';
import { attachResponseInterceptor } from './interceptors/response.interceptor';
import { config } from '~/utils/config';
import { attachLanguageInterceptor } from './interceptors/language.interceptor';

export const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  },
  withCredentials: false
});

attachRequestInterceptor(apiClient);
attachLanguageInterceptor(apiClient);
attachResponseInterceptor(apiClient);
