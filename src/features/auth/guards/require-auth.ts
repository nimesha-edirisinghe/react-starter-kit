import { redirect } from '@tanstack/react-router';
import { useAuthStore } from '../auth-store';

export function requireAuth() {
  const { isAuthenticated } = useAuthStore.getState();
  if (!isAuthenticated) {
    throw redirect({ to: '/login' });
  }
}
