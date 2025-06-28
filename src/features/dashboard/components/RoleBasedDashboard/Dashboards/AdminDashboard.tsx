import { DashboardStats } from '../../DashboardStats/DashboardStats';
import { IncidentCharts } from '../../IncidentCharts/IncidentCharts';
import { RecentIncidents } from '../../RecentIncidents/RecentIncidents';

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-600">Full system overview and management</p>
      </div>

      <DashboardStats />
      <IncidentCharts />
      <RecentIncidents />
    </div>
  );
}
