import { useAuthStore } from '../authStore';

export const useAuth = () => {
  const { user, token, login, logout } = useAuthStore();
  return { user, token, login, logout };
};
