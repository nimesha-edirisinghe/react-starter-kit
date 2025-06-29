import { useAuthStore } from '~/features/auth/store/auth-store';
import { AdminDashboard } from './dashboards/AdminDashboard';
import { StewardDashboard } from './dashboards/StewardDashboard';
import { ViewerDashboard } from './dashboards/ViewerDashboard';

export function RoleBasedDashboard() {
  const { user } = useAuthStore();

  if (!user) return null;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'steward':
      return <StewardDashboard />;
    case 'viewer':
      return <ViewerDashboard />;
    default:
      return <ViewerDashboard />;
  }
}
