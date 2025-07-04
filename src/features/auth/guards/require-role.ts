import { redirect } from '@tanstack/react-router';
import { useAuthStore } from '../store/auth-store';

export function requireRole(allowedRoles: string[]) {
  const { user, isAuthenticated, isHydrated } = useAuthStore.getState();

  if (!isHydrated) {
    return;
  }

  if (!isAuthenticated) {
    throw redirect({ to: '/login' });
  }

  if (!user || !allowedRoles.includes(user.role)) {
    throw redirect({ to: '/access-denied' });
  }
}
