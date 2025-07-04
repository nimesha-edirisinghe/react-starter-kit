import { LiveClock } from './LiveClock';

export function LiveHeader() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-custom-primary-fill rounded-lg " />
      <div className="relative px-4 py-6 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-1 sm:mb-2">
              🏁 Live Race Monitor
            </h1>
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg">
              Real-time racing incident tracking and analysis
            </p>
          </div>
          <div className="flex items-center justify-center sm:justify-end space-x-3 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-600 font-semibold text-base sm:text-lg">LIVE</span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <LiveClock />
          </div>
        </div>
      </div>
    </div>
  );
}
