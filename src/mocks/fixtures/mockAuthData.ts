import { UserRole } from '~/features/auth/types/auth';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Optional, only for mock/testing
  token?: string; // Optional, only for mock/testing
  role: UserRole;
}

export const mockAuthUser = {
  id: '1',
  name: 'Admin',
  email: 'admin@gmail.com',
  password: '1Qaz2wsx#',
  token: 'mock-token-123',
  role: 'viewer'
};
