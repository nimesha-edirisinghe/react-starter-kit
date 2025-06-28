'use client';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { AlertTriangle, Clock, MapPin, Radio } from 'lucide-react';
import { useState, useEffect } from 'react';
import { mockIncidents } from '~/mocks/fixtures/mockIncidents';

export function LiveIncidentFeed() {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [isLive] = useState(true);

  // Simulate live updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Simulate new incident or status update
      setIncidents((prev) => [...prev]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-50';
      case 'high':
        return 'border-orange-500 bg-orange-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-900 flex items-center space-x-2">
            <Radio className="h-5 w-5 text-red-500" />
            <span>Live Incident Feed</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-600">LIVE</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className={`p-3 rounded-lg border-l-4 ${getSeverityColor(incident.severity)} border border-slate-200`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-slate-600" />
                    <span className="font-medium text-slate-900">
                      {incident.type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                    <Badge variant="outline" className="text-xs border-slate-300 text-slate-700">
                      {incident.raceCategory}
                    </Badge>
                  </div>

                  <p className="text-sm text-slate-700">{incident.description}</p>

                  <div className="flex items-center space-x-3 text-xs text-slate-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{incident.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Lap {incident.lapNumber}</span>
                    </div>
                  </div>
                </div>

                <Badge
                  className={
                    incident.status === 'resolved'
                      ? 'bg-green-100 text-green-800'
                      : incident.status === 'investigating'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }
                >
                  {incident.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
