import { createFileRoute } from '@tanstack/react-router';
import { requireRole } from '~/features/auth/guards/require-role';
import IncidentPageWrapper from '~/features/incident/components/incident-page-wrapper/IncidentPageWrapper';
import { AuthGuard } from '~/features/auth/components/AuthGuard';

export const Route = createFileRoute('/_protected/incidents')({
  beforeLoad: () => requireRole(['admin']),
  component: RouteComponent
});

function RouteComponent() {
  return (
    <AuthGuard requiredRoles={['admin']}>
      <IncidentPageWrapper />
    </AuthGuard>
  );
}
