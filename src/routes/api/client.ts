import axios from "axios";
import { attachRequestInterceptor } from "./interceptors/request.interceptor";
import { attachResponseInterceptor } from "./interceptors/response.interceptor";

export const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

attachRequestInterceptor(apiClient);
attachResponseInterceptor(apiClient);
