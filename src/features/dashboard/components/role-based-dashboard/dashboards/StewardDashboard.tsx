import { DashboardStats } from '../../dashboard-stats/DashboardStats';
import { IncidentCharts } from '../../incident-charts/IncidentCharts';
import { RecentIncidents } from '../../recent-incidents/RecentIncidents';

export function StewardDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Steward Dashboard</h1>
        <p className="text-slate-600">Steward overview and incident management</p>
      </div>

      <DashboardStats />
      <IncidentCharts />
      <RecentIncidents />
    </div>
  );
}
