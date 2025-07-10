import { DashboardStats } from '../../dashboard-stats/DashboardStats';
import { useIncidentWebSocket } from '~/features/incident/hooks/useIncidentWebSocket';

export function ViewerDashboard() {
  // Initialize WebSocket connection for real-time updates
  useIncidentWebSocket();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Viewer Dashboard</h1>
        <p className="text-slate-600">Read-only access to incident information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardStats />
      </div>
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <p className="text-slate-600">View recent incidents and updates</p>
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-2">Live Monitoring</h3>
        <p className="text-slate-600 mb-4">Access real-time incident tracking</p>
        <a
          href="/live"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Live View
        </a>
      </div>
    </div>
  );
}
