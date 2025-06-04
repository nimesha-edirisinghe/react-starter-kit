import axios from 'axios';
import { attachRequestInterceptor } from './interceptors/request.interceptor';
import { attachResponseInterceptor } from './interceptors/response.interceptor';
import { config } from '~/utils/config';

export const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

attachRequestInterceptor(apiClient);
attachResponseInterceptor(apiClient);
