'use client';

import { getIncidentsBySeverity } from '~/mocks/fixtures/mockIncidents';
import { TrendChart } from './TrendChart';
import { SeverityPieChart } from './SeverityPieChart';
import { HourlyBarChart } from './HourlyBarChart';
import { CircuitRadarChart } from './CircuitRadarChart';
import { CircuitPerformanceChart } from './CircuitPerformanceChart';
import { generateCircuitData, generateHourlyData, generateTrendData } from './utils/dataGenerators';
import { SEVERITY_COLORS } from './utils/constants';

export function IncidentCharts() {
  const severityData = getIncidentsBySeverity().map((item) => ({
    ...item,
    fill: SEVERITY_COLORS[item.name as keyof typeof SEVERITY_COLORS] || '#64748b'
  }));

  const trendData = generateTrendData();
  const hourlyData = generateHourlyData();
  const circuitData = generateCircuitData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TrendChart data={trendData} />
      <SeverityPieChart data={severityData} />
      <HourlyBarChart data={hourlyData} />
      <CircuitRadarChart data={circuitData} />
      <CircuitPerformanceChart data={circuitData} />
    </div>
  );
}
