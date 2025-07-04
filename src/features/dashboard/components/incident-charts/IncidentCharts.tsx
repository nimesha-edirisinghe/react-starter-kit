import { TrendChart } from './TrendChart';
import { SeverityPieChart } from './SeverityPieChart';
import { HourlyBarChart } from './HourlyBarChart';
import { CircuitRadarChart } from './CircuitRadarChart';
import { CircuitPerformanceChart } from './CircuitPerformanceChart';
import {
  useSeverityDataQuery,
  useTrendDataQuery,
  useHourlyDataQuery,
  useCircuitDataQuery
} from '~/api/queries/dashboard/useChartDataQuery';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { BarChart3, RefreshCw, TrendingUp, WifiOff } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';

export function IncidentCharts() {
  const {
    data: severityData,
    isLoading: severityLoading,
    error: severityError,
    refetch: severityRefetch
  } = useSeverityDataQuery();
  const {
    data: trendData,
    isLoading: trendLoading,
    error: trendError,
    refetch: trendRefetch
  } = useTrendDataQuery();
  const {
    data: hourlyData,
    isLoading: hourlyLoading,
    error: hourlyError,
    refetch: hourlyRefetch
  } = useHourlyDataQuery();
  const {
    data: circuitData,
    isLoading: circuitLoading,
    error: circuitError,
    refetch: circuitRefetch
  } = useCircuitDataQuery();

  const isLoading = severityLoading || trendLoading || hourlyLoading || circuitLoading;
  const isError = trendError || severityError || hourlyError || circuitError;

  const refetchHandler = () => {
    trendRefetch?.();
    severityRefetch?.();
    hourlyRefetch?.();
    circuitRefetch?.();
  };

  if (isLoading) {
    return (
      <>
        <Card className="border border-border bg-card/50">
          <CardContent className="pt-0">
            <div className="grid gap-6">
              <Skeleton className="h-64 w-full rounded-lg" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="h-64 w-full rounded-lg" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  if (isError) {
    return (
      <Card className="lg:col-span-2 border-red-200 bg-red-50/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>30-Day Incident Trends</span>
          </CardTitle>
          <CardDescription>Daily incident reports, resolutions, and response times</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-[350px] space-y-4">
            <div className="flex items-center justify-center p-2 rounded-full bg-red-100">
              <WifiOff className="h-5 w-5 text-red-600" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-red-900">Failed to Load Incident Trends</h3>
              <p className="text-red-700 text-sm max-w-md">
                {isError.message ||
                  'Unable to fetch trend data. The chart cannot be displayed at this time.'}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2 flex-col">
              {refetchHandler && (
                <Button
                  onClick={refetchHandler}
                  variant="outline"
                  size="sm"
                  className="cursor-pointer border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800 bg-transparent"
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  {isLoading ? 'Retrying...' : 'Retry'}
                </Button>
              )}

              <div className="flex items-center gap-2 text-red-600 text-sm">
                <BarChart3 className="h-4 w-4" />
                Chart unavailable
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TrendChart data={trendData || []} />
      <SeverityPieChart data={severityData || []} />
      <HourlyBarChart data={hourlyData || []} />
      <CircuitRadarChart data={circuitData || []} />
      <CircuitPerformanceChart data={circuitData || []} />
    </div>
  );
}
