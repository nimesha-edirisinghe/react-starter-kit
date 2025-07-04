import { createFileRoute, redirect } from '@tanstack/react-router';
import { RoleBasedDashboard } from '~/features/dashboard/components/role-based-dashboard/RoleBasedDashboard';
import { useAuthStore } from '~/features/auth/store/auth-store';

export const Route = createFileRoute('/_protected/')({
  beforeLoad: () => {
    const { user } = useAuthStore.getState();
    if (user?.role === 'viewer') {
      throw redirect({ to: '/live' });
    }
  },
  component: Home
});

function Home() {
  return <RoleBasedDashboard />;
}
