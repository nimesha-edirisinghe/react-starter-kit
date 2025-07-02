import { LiveClock } from './LiveClock';

export function LiveHeader() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg" />
      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">🏁 Live Race Monitor</h1>
            <p className="text-slate-600 text-lg">
              Real-time racing incident tracking and analysis
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-600 font-semibold text-lg">LIVE</span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <LiveClock />
          </div>
        </div>
      </div>
    </div>
  );
}
