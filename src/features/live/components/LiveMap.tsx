import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { TimezoneDate } from '~/components/common/TimezoneDate';
import { useTrackMapQuery } from '~/api/queries/live/useTrackMapQuery';
import { LoadingCard } from '~/components/common/LoadingCard';
import { ErrorCard } from '~/components/common/ErrorCard';
import { MapPin } from 'lucide-react';

export function LiveMap() {
  const { data, isLoading, error } = useTrackMapQuery();

  if (isLoading) {
    return <LoadingCard title="Live Track Map" />;
  }

  if (error) {
    return <ErrorCard title="Live Track Map" message="Failed to load track map data" />;
  }

  if (!data) {
    return null;
  }

  const { incidents, trackInfo } = data;

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { color: 'bg-red-500', pulse: 'animate-ping', size: 'w-4 h-4' };
      case 'high':
        return { color: 'bg-orange-500', pulse: 'animate-pulse', size: 'w-3 h-3' };
      case 'medium':
        return { color: 'bg-yellow-500', pulse: 'animate-pulse', size: 'w-3 h-3' };
      case 'low':
        return { color: 'bg-green-500', pulse: '', size: 'w-2 h-2' };
      default:
        return { color: 'bg-gray-500', pulse: '', size: 'w-2 h-2' };
    }
  };

  return (
    <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-slate-900 flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-green-600" />
          <span>Live Track Map</span>
          <Badge className="bg-green-100 text-green-700">{trackInfo.name}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="relative bg-slate-100 rounded-lg p-4 mb-4 border border-slate-200"
          style={{ height: '28vh' }}
        >
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))' }}
          >
            {/* Track outline */}
            <path
              d="M 10 20 Q 20 10 40 15 Q 60 20 80 30 Q 90 40 85 60 Q 80 80 60 85 Q 40 90 20 85 Q 10 70 10 50 Q 10 35 10 20"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
              strokeDasharray="2,2"
              className="animate-pulse"
            />

            {/* Start/Finish line */}
            <line x1="10" y1="20" x2="15" y2="25" stroke="#059669" strokeWidth="3" />

            {/* Pit lane */}
            <path d="M 70 65 Q 75 70 80 70" fill="none" stroke="#d97706" strokeWidth="2" />
          </svg>

          {/* Live Incidents */}
          {incidents.map((incident) => {
            const config = getSeverityConfig(incident.severity);
            return (
              <div
                key={incident.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${incident.x}%`, top: `${incident.y}%` }}
              >
                <div
                  className={`${config.color} ${config.size} rounded-full ${config.pulse}`}
                ></div>
                {incident.severity === 'critical' && (
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-slate-600">Low</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-600">Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-600">High</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
            <span className="text-xs text-slate-600">Critical</span>
          </div>
        </div>

        {/* Recent Incidents List */}
        <div className="mt-4">
          <h4 className="text-sm font-medium text-slate-700 mb-2">Recent Incidents</h4>
          <div className="space-y-2 max-h-20 overflow-y-auto">
            {incidents.slice(0, 5).map((incident) => (
              <div
                key={incident.id}
                className="flex items-center justify-between p-2 bg-slate-50 rounded text-xs cursor-pointer hover:bg-slate-100 transition-colors border border-slate-200"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${getSeverityConfig(incident.severity).color}`}
                  ></div>
                  <span className="text-slate-700">{incident.location}</span>
                </div>
                <TimezoneDate date={incident.timestamp} format="time" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
