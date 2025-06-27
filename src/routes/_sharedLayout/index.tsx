import { createFileRoute } from '@tanstack/react-router';
import { DashboardStats } from '~/features/dashboard/components/DashboardStats/DashboardStats';
import { IncidentCharts } from '~/features/dashboard/components/IncidentCharts/IncidentCharts';
import { RecentIncidents } from '~/features/dashboard/components/RecentIncidents/RecentIncidents';

export const Route = createFileRoute('/_sharedLayout/')({
  component: Home
});

function Home() {
  return (
    <div className="space-y-6 ">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-600">Overview of racing incidents and system management</p>
      </div>
      <DashboardStats />
      <IncidentCharts />
      <RecentIncidents />
    </div>
  );
}
