import { Outlet, createFileRoute } from '@tanstack/react-router';
import { RoleBasedLayout } from '~/components/layout/role-based/RoleBasedLayout';
import { RoleBasedRedirect } from '~/components/layout/role-based/RoleBasedRedirect';
import { AuthGuard } from '~/features/auth/components/AuthGuard';
import { requireAuth } from '~/features/auth/guards/require-auth';
import { NotFound } from '~/components/feedback/NotFound';

export const Route = createFileRoute('/_protected')({
  beforeLoad: requireAuth,
  component: ProtectedLayoutComponent,
  notFoundComponent: () => (
    <NotFound>
      <div className="space-y-2">
        <p className="text-muted-foreground">
          This protected page doesn't exist or you may not have access to it.
        </p>
        <p className="text-xs text-muted-foreground/80">
          Check your permissions or try one of the suggested pages below.
        </p>
      </div>
    </NotFound>
  )
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
