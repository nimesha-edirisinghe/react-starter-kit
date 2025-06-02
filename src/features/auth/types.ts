export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
