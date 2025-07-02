import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { AlertTriangle, Clock, MapPin, RefreshCw, WifiOff } from 'lucide-react';
import { useRecentIncidentsQuery } from '~/api/queries/dashboard/useRecentIncidentsQuery';
import { getStatusColor } from '~/utils/utilsGetStatusColor';
import { Button } from '~/components/ui/button';

export function RecentIncidents() {
  const { data: recentIncidents, isLoading, error, refetch } = useRecentIncidentsQuery();

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

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Incidents</CardTitle>
          <CardDescription>Latest racing incidents requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 animate-pulse rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="col-span-full border-red-200 bg-red-50/50">
          <CardHeader className="flex justify-center">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-2 rounded-full bg-red-100">
                <WifiOff className="h-5 w-5 text-red-600" />
              </div>
              <div className="text-center">
                <CardTitle className="text-red-900 text-lg">
                  Failed to Load Recent Incidents
                </CardTitle>
                <p className="text-red-700 text-sm mt-1">
                  {error?.message ||
                    'Unable to fetch dashboard statistics. Please check your connection and try again.'}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0 flex justify-center">
            <div className="flex flex-col items-center gap-3">
              <Button
                onClick={() => refetch()}
                variant="outline"
                size="sm"
                className="border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Connection issue detected
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Incidents</CardTitle>
        <CardDescription>Latest racing incidents requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentIncidents?.map((incident) => (
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
