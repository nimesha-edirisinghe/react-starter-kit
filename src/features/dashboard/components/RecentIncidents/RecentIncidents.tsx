import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';
import { mockIncidents } from '~/mocks/fixtures/mockIncidents';
import { getStatusColor } from '~/utils/utilsGetStatusColor';

export function RecentIncidents() {
  const recentIncidents = mockIncidents.slice(0, 5);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Incidents</CardTitle>
        <CardDescription>Latest racing incidents requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentIncidents.map((incident) => (
            <div
              key={incident.id}
              className="flex items-start space-x-4 p-4 border border-slate-200 rounded-lg"
            >
              <div className={`p-2 rounded-full ${getSeverityColor(incident.severity)}`}>
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-900">
                    {incident.type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())} -{' '}
                    {incident.raceCategory}
                  </h4>
                  <Badge className={getStatusColor(incident.status)}>{incident.status}</Badge>
                </div>

                <p className="text-sm text-slate-600">{incident.description}</p>

                <div className="flex items-center space-x-4 text-xs text-slate-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>
                      {incident.circuit} - {incident.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      Lap {incident.lapNumber} - {incident.raceTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500">Drivers:</span>
                  {incident.drivers.map((driver, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {driver}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
