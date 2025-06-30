import { Link, useRouterState } from '@tanstack/react-router';
import { ReactNode } from 'react';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import { useAuthStore } from '~/features/auth/store/auth-store';
import { Button } from '~/components/ui/button';

export function NotFound({ children }: { children?: ReactNode }) {
  const { user } = useAuthStore();
  const currentPath = useRouterState({
    select: (state) => state.location.pathname
  });

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Simple fallback based on user role
      const fallbackPath = user?.role === 'viewer' ? '/live' : '/';
      window.location.href = fallbackPath;
    }
  };

  // Default message if no children provided
  const defaultMessage = (
    <div className="space-y-2">
      <p className="text-muted-foreground">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <p className="text-xs text-muted-foreground/80">
        URL: <code className="bg-muted px-1 py-0.5 rounded text-xs">{currentPath}</code>
      </p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6 px-4">
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-3 text-destructive">
          <AlertTriangle className="h-8 w-8" />
          <h1 className="text-3xl font-bold">404</h1>
        </div>

        <h2 className="text-xl font-semibold">Page Not Found</h2>

        <div className="text-sm max-w-md">{children || defaultMessage}</div>
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        <Button onClick={handleGoBack} variant="outline" className="gap-2 cursor-pointer">
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>

        <Button asChild className="gap-2 cursor-pointer">
          <Link to={user?.role === 'viewer' ? '/live' : '/'}>
            <Home className="h-4 w-4" />
            {user?.role === 'viewer' ? 'Live Dashboard' : 'Dashboard'}
          </Link>
        </Button>
      </div>
    </div>
  );
}
