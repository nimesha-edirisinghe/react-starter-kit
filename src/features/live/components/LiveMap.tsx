'use client';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { MapPin, AlertTriangle, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TrackIncident {
  id: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  timestamp: Date;
  x: number;
  y: number;
}

export function LiveMap() {
  const [trackIncidents, setTrackIncidents] = useState<TrackIncident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<TrackIncident | null>(null);

  // Simulate live incidents on track
  useEffect(() => {
    const locations = [
      { name: 'Turn 1', x: 15, y: 20 },
      { name: 'Turn 3', x: 45, y: 35 },
      { name: 'Pit Lane', x: 80, y: 70 },
      { name: 'Sector 2', x: 60, y: 50 },
      { name: 'Chicane', x: 30, y: 80 }
    ];

    const severities: Array<'low' | 'medium' | 'high' | 'critical'> = [
      'low',
      'medium',
      'high',
      'critical'
    ];
    const types = ['Collision', 'Debris', 'Mechanical', 'Flag', 'Safety'];

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        // 40% chance of new incident
        const location = locations[Math.floor(Math.random() * locations.length)];
        const newIncident: TrackIncident = {
          id: Date.now().toString(),
          location: location.name,
          severity: severities[Math.floor(Math.random() * severities.length)],
          type: types[Math.floor(Math.random() * types.length)],
          timestamp: new Date(),
          x: location.x + (Math.random() - 0.5) * 10, // Add some randomness
          y: location.y + (Math.random() - 0.5) * 10
        };

        setTrackIncidents((prev) => [newIncident, ...prev.slice(0, 9)]); // Keep only 10 most recent
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
          <Badge className="bg-green-100 text-green-700">Monaco GP</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Track Map */}
        <div
          className="relative bg-slate-100 rounded-lg p-4 mb-4 border border-slate-200"
          style={{ aspectRatio: '4/3' }}
        >
          {/* Track Layout (simplified Monaco) */}
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
          {trackIncidents.map((incident) => {
            const config = getSeverityConfig(incident.severity);
            return (
              <div
                key={incident.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${incident.x}%`, top: `${incident.y}%` }}
                onClick={() => setSelectedIncident(incident)}
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

        {/* Selected Incident Details */}
        {selectedIncident && (
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-slate-900">{selectedIncident.type}</span>
              </div>
              <Badge className={`${getSeverityConfig(selectedIncident.severity).color} text-white`}>
                {selectedIncident.severity}
              </Badge>
            </div>
            <p className="text-sm text-slate-700 mb-1">{selectedIncident.location}</p>
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <Clock className="h-3 w-3" />
              <span>{selectedIncident.timestamp.toLocaleTimeString()}</span>
            </div>
          </div>
        )}

        {/* Recent Incidents List */}
        <div className="mt-4">
          <h4 className="text-sm font-medium text-slate-700 mb-2">Recent Incidents</h4>
          <div className="space-y-2 max-h-20 overflow-y-auto">
            {trackIncidents.slice(0, 5).map((incident) => (
              <div
                key={incident.id}
                className="flex items-center justify-between p-2 bg-slate-50 rounded text-xs cursor-pointer hover:bg-slate-100 transition-colors border border-slate-200"
                onClick={() => setSelectedIncident(incident)}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${getSeverityConfig(incident.severity).color}`}
                  ></div>
                  <span className="text-slate-700">{incident.location}</span>
                </div>
                <span className="text-slate-500">{incident.timestamp.toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
