import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../store/auth-store';
import { Skeleton } from '~/components/ui/skeleton';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export function AuthGuard({ children, requiredRoles }: AuthGuardProps) {
  const navigate = useNavigate();
  const { isAuthenticated, isHydrated, user } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isHydrated) {
      if (!isAuthenticated) {
        navigate({ to: '/login' });
        return;
      }

      if (requiredRoles && user && !requiredRoles.includes(user.role)) {
        navigate({ to: '/access-denied' });
        return;
      }

      setIsChecking(false);
    }
  }, [isHydrated, isAuthenticated, user, requiredRoles, navigate]);

  if (!isHydrated || isChecking) {
    return (
      <div className="flex flex-col max-w-6xl mx-auto p-4 pt-12">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
