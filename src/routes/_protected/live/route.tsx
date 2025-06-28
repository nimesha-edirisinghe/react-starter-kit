import { createFileRoute } from '@tanstack/react-router';
import { LiveAlerts } from '~/features/live/components/LiveAlerts';
import { LiveCharts } from '~/features/live/components/LiveCharts';
import { LiveIncidentFeed } from '~/features/live/components/LiveIncidentFeed';
import { LiveMap } from '~/features/live/components/LiveMap';
import { RaceStatus } from '~/features/live/components/RaceStatus';

export const Route = createFileRoute('/_protected/live')({
  component: ViewerLive
});

function ViewerLive() {
  return (
    <div className="space-y-6 min-h-screen">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg"></div>
        <div className="relative p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">🏁 Live Race Monitor</h1>
              <p className="text-slate-600 text-lg">
                Real-time racing incident tracking and analysis
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-600 font-semibold text-lg">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      <LiveAlerts />
      <RaceStatus />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <LiveCharts />
        </div>
        <div>
          <LiveMap />
        </div>
      </div>

      <LiveIncidentFeed />
    </div>
  );
}
