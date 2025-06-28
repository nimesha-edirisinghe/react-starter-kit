'use client';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Flag, Clock, Users, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

export function RaceStatus() {
  const [raceTime, setRaceTime] = useState('01:23:45');
  const [currentLap] = useState(67);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate race time progression
      const [hours, minutes, seconds] = raceTime.split(':').map(Number);
      const totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;
      const newHours = Math.floor(totalSeconds / 3600);
      const newMinutes = Math.floor((totalSeconds % 3600) / 60);
      const newSeconds = totalSeconds % 60;

      setRaceTime(
        `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [raceTime]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-600 flex items-center space-x-2">
            <Flag className="h-4 w-4" />
            <span>Race Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-slate-900">LIVE</div>
            <Badge className="bg-green-500 text-white">Racing</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-600 flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Race Time</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900 font-mono">{raceTime}</div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-600 flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Current Lap</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">{currentLap}/78</div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-600 flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Circuit</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-slate-900">Monaco GP</div>
        </CardContent>
      </Card>
    </div>
  );
}
