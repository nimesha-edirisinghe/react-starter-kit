import { createFileRoute } from '@tanstack/react-router';
import { requireRole } from '~/features/auth/guards/require-role';
import IncidentPageWrapper from '~/features/incident/components/incident-page-wrapper/IncidentPageWrapper';

export const Route = createFileRoute('/_protected/incidents')({
  beforeLoad: () => requireRole(['admin', 'steward']),
  component: RouteComponent
});

function RouteComponent() {
  return <IncidentPageWrapper />;
}
