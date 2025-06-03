import { Outlet, createFileRoute } from '@tanstack/react-router';
import { requireAuth } from '~/features/auth/guards/require-auth';

export const Route = createFileRoute('/_protected')({
  beforeLoad: requireAuth,
  component: ProtectedLayoutComponent
});

function ProtectedLayoutComponent() {
  return (
    <main className="flex flex-col max-w-6xl mx-auto p-4 pt-12">
      <Outlet />
    </main>
  );
}
