import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../store/auth-store';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const { isAuthenticated, isHydrated } = useAuthStore();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      navigate({ to: '/login' });
    }
  }, [isHydrated, isAuthenticated, navigate]);

  if (!isHydrated) {
    return null;
  }

  return isAuthenticated ? <>{children}</> : null;
}
