import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '~/features/auth/store';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  }
});
