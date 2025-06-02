import { apiClient } from '../client';

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const response = await apiClient.post('/auth/login', payload);
  return response.data;
};

export const fetchCurrentUser = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};
