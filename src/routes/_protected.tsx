import { Outlet, createFileRoute } from '@tanstack/react-router';
import { RoleBasedLayout } from '~/components/layout/role-based/RoleBasedLayout';
import { RoleBasedRedirect } from '~/components/layout/role-based/RoleBasedRedirect';
import { AuthGuard } from '~/features/auth/components/AuthGuard';
import { requireAuth } from '~/features/auth/guards/require-auth';

export const Route = createFileRoute('/_protected')({
  beforeLoad: requireAuth,
  component: ProtectedLayoutComponent
});

function ProtectedLayoutComponent() {
  return (
    <AuthGuard>
      <RoleBasedRedirect />
      <RoleBasedLayout>
        <Outlet />
      </RoleBasedLayout>
    </AuthGuard>
  );
}
