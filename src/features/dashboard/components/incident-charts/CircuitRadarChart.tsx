import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend
} from 'recharts';
import { MapPin } from 'lucide-react';
import { CustomTooltip } from './chart-tooltips/CustomTooltip';

export function CircuitRadarChart({ data }: { data: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span>Circuit Risk Analysis</span>
        </CardTitle>
        <CardDescription>Multi-dimensional circuit performance comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={data} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="circuit" tick={{ fontSize: 12, fill: '#64748b' }} />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: '#64748b' }}
            />
            <Radar
              name="Risk Score"
              dataKey="riskScore"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Incidents"
              dataKey="incidents"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
