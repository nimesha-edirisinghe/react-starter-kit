export type UserRole = 'admin' | 'steward' | 'viewer';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface LoginResponse {
  user: User;
  token: string;
}
