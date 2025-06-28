import { createFileRoute } from '@tanstack/react-router';
import { IncidentTable } from '~/features/incident/components/IncidentTable';

export const Route = createFileRoute('/_protected/incidents')({
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
