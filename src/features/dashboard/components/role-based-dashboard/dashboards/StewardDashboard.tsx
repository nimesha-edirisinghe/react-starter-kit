import { useTranslation } from 'react-i18next';
import { DashboardStats } from '../../dashboard-stats/DashboardStats';
import { IncidentCharts } from '../../incident-charts/IncidentCharts';
import { RecentIncidents } from '../../recent-incidents/RecentIncidents';

export function StewardDashboard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{t('dashboard.stewardDashboard')}</h1>
        <p className="text-slate-600">{t('common.stewardOverview')}</p>
      </div>

      <DashboardStats />
      <IncidentCharts />
      <RecentIncidents />
    </div>
  );
}
