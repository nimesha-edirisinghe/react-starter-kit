// src/features/auth/guards/require-role.ts
import { redirect } from '@tanstack/react-router';
import { useAuthStore } from '../store/auth-store';

export function requireRole(allowedRoles: string[]) {
  const { user, isAuthenticated, isHydrated } = useAuthStore.getState();

  // Debug logging (remove in production)
  console.log('requireRole check:', {
    isHydrated,
    isAuthenticated,
    userRole: user?.role,
    allowedRoles,
    hasAccess: user && allowedRoles.includes(user.role)
  });

  if (!isHydrated) {
    console.log('Not hydrated yet, allowing route to load');
    return;
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    throw redirect({ to: '/login' });
  }

  if (!user || !allowedRoles.includes(user.role)) {
    console.log('Access denied, redirecting to access-denied');
    throw redirect({ to: '/access-denied' });
  }

  console.log('Access granted');
}
