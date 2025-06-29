import { useAuthStore } from '~/features/auth/store/auth-store';
import { AdminLayout } from './AdminLayout';
import { StewardLayout } from './StewardLayout';
import { ViewerLayout } from './ViewerLayout';

export function RoleBasedLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  if (!user) return null;

  switch (user.role) {
    case 'admin':
      return <AdminLayout>{children}</AdminLayout>;
    case 'steward':
      return <StewardLayout>{children}</StewardLayout>;
    case 'viewer':
      return <ViewerLayout>{children}</ViewerLayout>;
    default:
      return <ViewerLayout>{children}</ViewerLayout>;
  }
}
