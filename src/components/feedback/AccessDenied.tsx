import { Link } from '@tanstack/react-router';
import { Home, Shield } from 'lucide-react';
import { useAuthStore } from '~/features/auth/store/auth-store';

export function AccessDenied() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6 px-4 animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center gap-3 text-yellow-600">
        <Shield className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Access Denied</h1>
      </div>

      <div className="text-muted-foreground text-sm max-w-md">
        <p className="mb-2">You do not have permission to view this page.</p>
        {user && (
          <p className="text-xs bg-muted p-2 rounded">
            Current role: <span className="font-medium">{user.role}</span>
          </p>
        )}
        <p className="mt-2">If you believe this is a mistake, please contact your administrator.</p>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          to="/"
          className="inline-flex items-center text-primary gap-2 border border-primary px-4 py-2 rounded-md font-semibold text-sm transition cursor-pointer hover:bg-primary hover:text-primary-foreground"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
      </div>
    </div>
  );
}
