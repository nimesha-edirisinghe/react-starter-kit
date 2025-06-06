import { redirect } from '@tanstack/react-router';
import { useAuthStore } from '../store/auth-store';

export function requireAuth() {
  const { isAuthenticated, isHydrated } = useAuthStore.getState();

  if (!isHydrated) {
    return;
  }

  if (!isAuthenticated) {
    throw redirect({ to: '/login' });
  }
}
