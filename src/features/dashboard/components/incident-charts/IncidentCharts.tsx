'use client';

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

export function IncidentCharts() {
  const { data: severityData, isLoading: severityLoading } = useSeverityDataQuery();
  const { data: trendData, isLoading: trendLoading } = useTrendDataQuery();
  const { data: hourlyData, isLoading: hourlyLoading } = useHourlyDataQuery();
  const { data: circuitData, isLoading: circuitLoading } = useCircuitDataQuery();

  const isLoading = severityLoading || trendLoading || hourlyLoading || circuitLoading;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 animate-pulse rounded"></div>
        ))}
      </div>
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
