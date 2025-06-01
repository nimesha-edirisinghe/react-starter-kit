import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '~/features/auth/store';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw redirect({ to: '/login' });
    }
  }
});
