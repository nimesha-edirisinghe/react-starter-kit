import axios from 'axios';
import { attachRequestInterceptor } from './interceptors/request.interceptor';
import { attachResponseInterceptor } from './interceptors/response.interceptor';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

attachRequestInterceptor(apiClient);
attachResponseInterceptor(apiClient);
