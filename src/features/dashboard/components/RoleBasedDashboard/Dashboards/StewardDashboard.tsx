import { DashboardStats } from '../../DashboardStats/DashboardStats';
import { IncidentCharts } from '../../IncidentCharts/IncidentCharts';
import { RecentIncidents } from '../../RecentIncidents/RecentIncidents';

export function StewardDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Steward Dashboard</h1>
        <p className="text-slate-600">Incident management and oversight</p>
      </div>

      <DashboardStats />
      <IncidentCharts />
      <RecentIncidents />
    </div>
  );
}
