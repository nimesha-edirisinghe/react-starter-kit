import { useEffect, useState } from 'react';
import { useTimezone } from '~/hooks/useTimezone';

export function LiveClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { selectedCountry, formatTime, formatDate } = useTimezone();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center space-x-3 px-3 py-2 bg-custom-primary-fill rounded-lg">
      <div className="flex items-center space-x-1">
        <span className="text-base">{selectedCountry.flag}</span>
        <span className="text-xs text-slate-500 font-medium">
          {selectedCountry.timezone.split('/')[1]?.replace('_', ' ')}
        </span>
      </div>

      <div className="h-4 w-px bg-slate-300" />

      <div className="flex items-center space-x-2">
        <div className="text-slate-900 font-mono text-lg font-bold">
          {formatTime(currentTime, {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </div>
        <div className="text-xs text-slate-500">
          {formatDate(currentTime, {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      </div>
    </div>
  );
}
