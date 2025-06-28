import { useAuthStore } from '~/features/auth/store/auth-store';
import { AdminDashboard } from './Dashboards/AdminDashboard';
import { StewardDashboard } from './Dashboards/StewardDashboard';
import { ViewerDashboard } from './Dashboards/ViewerDashboard';

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
