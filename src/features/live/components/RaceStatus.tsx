import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Flag, Clock, Users, MapPin } from 'lucide-react';
import { useRaceDetailsQuery } from '~/api/queries/live/useRaceDetailsQuery';
import { Skeleton } from '~/components/ui/skeleton';
import { useEffect, useState } from 'react';

const MAX_HOURS = 6;

export function RaceStatus() {
  const { data: raceDetails, isLoading } = useRaceDetailsQuery();
  const [currentTime, setCurrentTime] = useState('00:00:00');

  useEffect(() => {
    if (raceDetails?.raceTime) {
      setCurrentTime(raceDetails.raceTime);
      const timer = setInterval(() => {
        setCurrentTime((prevTime) => {
          const [hours, minutes, seconds] = prevTime.split(':').map(Number);

          let newSeconds = seconds + 1;
          let newMinutes = minutes;
          let newHours = hours;

          if (newSeconds >= 60) {
            newSeconds = 0;
            newMinutes += 1;
          }
          if (newMinutes >= 60) {
            newMinutes = 0;
            newHours += 1;
          }

          if (newHours >= MAX_HOURS) {
            return '00:00:00';
          }
          return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
        });
      }, 1000);

      // Cleanup timer on unmount or when raceTime changes
      return () => clearInterval(timer);
    }
  }, [raceDetails?.raceTime]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <Card
            key={index}
            className="border border-border bg-card/50 backdrop-blur-sm shadow-lg animate-pulse"
          >
            <div className="space-y-4 w-full px-4">
              <Skeleton className="h-4 w-[10px]" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

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
            <Badge className="bg-green-500 text-white">{raceDetails?.status || 'Unknown'}</Badge>
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
          <div className="text-2xl font-bold text-slate-900 font-mono">{currentTime}</div>
          {currentTime === '05:59:59' && (
            <div className="text-sm text-red-500 mt-1">Timer will reset in 1 second</div>
          )}
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
          <div className="text-2xl font-bold text-slate-900">
            {raceDetails?.currentLap || 0}/{raceDetails?.totalLaps || 0}
          </div>
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
          <div className="text-lg font-bold text-slate-900">
            {raceDetails?.circuit || 'Monaco GP'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
