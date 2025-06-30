import { createFileRoute } from '@tanstack/react-router';
import { LiveAlerts } from '~/features/live/components/LiveAlerts';
import { LiveCharts } from '~/features/live/components/LiveCharts';
import { LiveIncidentFeed } from '~/features/live/components/LiveIncidentFeed';
import { LiveMap } from '~/features/live/components/LiveMap';
import { RaceStatus } from '~/features/live/components/RaceStatus';
import { requireRole } from '~/features/auth/guards/require-role';
import { LiveHeader } from '~/features/live/components/LiveHeader';

export const Route = createFileRoute('/_protected/live')({
  beforeLoad: () => requireRole(['admin', 'steward', 'viewer']),
  component: ViewerLiveComponent
});

function ViewerLiveComponent() {
  return (
    <div className="space-y-6 min-h-screen">
      <LiveHeader />
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
