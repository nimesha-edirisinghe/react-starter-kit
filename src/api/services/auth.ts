import { apiClient } from '../client';
import type { LoginPayload } from '../types/auth.types';

export const loginUser = async (payload: LoginPayload) => {
  const response = await apiClient.post('/auth/login', payload);
  return response.data;
};
