'use client';

import { useEffect, useState } from 'react';

export function LiveClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center space-x-2 px-3 py-1 bg-slate-100 rounded-lg border border-slate-200">
      <div className="text-slate-900 font-mono text-lg font-bold">
        {currentTime.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })}
      </div>
      <div className="text-xs text-slate-500">
        {currentTime.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        })}
      </div>
    </div>
  );
}
