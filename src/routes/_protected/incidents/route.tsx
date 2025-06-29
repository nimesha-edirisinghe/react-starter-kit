import { createFileRoute } from '@tanstack/react-router';
import { requireRole } from '~/features/auth/guards/require-role';
import { IncidentTable } from '~/features/incident/components/incident-table/IncidentTable';

export const Route = createFileRoute('/_protected/incidents')({
  beforeLoad: () => requireRole(['admin', 'steward']),
  component: RouteComponent
});

function RouteComponent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Incident Management</h1>
        <p className="text-slate-600">
          Monitor and manage all racing incidents with advanced filtering
        </p>
      </div>
      <IncidentTable />
    </div>
  );
}
