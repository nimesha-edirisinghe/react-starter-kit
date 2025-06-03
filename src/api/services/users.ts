import { UserI } from '~/features/users/types/user';
import log from '~/utils/log';
import { apiClient } from '../client';

export const getUsers = async (): Promise<UserI[]> => {
  const res = await apiClient.get('/users');
  return res.data;
};

export const createUser = async (user: Partial<UserI>) => {
  const res = await apiClient.post('/users', user);
  return res.data;
};

export const getUserById = async (userId: string): Promise<UserI> => {
  try {
    const id = parseInt(userId, 10);
    if (isNaN(id)) throw new Error('Invalid user ID');
    const res = await apiClient.get(`/users/${id}`);
    return res.data;
  } catch (error) {
    log.error('Endpoint: getUserById failed', error);
    throw new Error('Failed to fetch user');
  }
};
