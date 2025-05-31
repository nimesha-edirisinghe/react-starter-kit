import { redirect } from '@tanstack/react-router';
import { useAuthStore } from '~/features/auth/store';

export function requireAuth() {
  const token = useAuthStore.getState().token;
  if (!token) {
    throw redirect({ to: '/login' });
  }
}
