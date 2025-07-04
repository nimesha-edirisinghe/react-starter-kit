import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '~/features/auth/store/auth-store';

export function RoleBasedRedirect() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'viewer') {
      navigate({ to: '/live' });
    }
  }, [user, navigate]);

  return null;
}
