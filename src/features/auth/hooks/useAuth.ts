import { useAuthStore } from '../store/auth-store';

export const useAuth = () => {
  const { user, token, login, logout } = useAuthStore();
  return { user, token, login, logout };
};
