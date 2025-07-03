import { LiveAlerts } from '../LiveAlerts';
import { LiveCharts } from '../LiveCharts';
import { LiveHeader } from '../LiveHeader';
import { LiveIncidentFeed } from '../LiveIncidentFeed';
import { LiveMap } from '../LiveMap';
import { RaceStatus } from '../RaceStatus';

export default function LivePageWrapper() {
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
