import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { CustomTooltip } from './chart-tooltips/CustomTooltip';
import { FC } from 'react';

interface TrendChartProps {
  data: any[];
}

export const TrendChart: FC<TrendChartProps> = ({ data }) => {
  // Calculate the interval for X-axis ticks (show 15 points including start and end)
  const tickInterval = Math.max(1, Math.floor((data.length - 1) / 19));

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span>30-Day Incident Trends</span>
        </CardTitle>
        <CardDescription>Daily incident reports, resolutions, and response times</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={12}
              interval={tickInterval}
              tickMargin={10}
              textAnchor="end"
            />
            <YAxis yAxisId="left" stroke="#64748b" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="incidents"
              fill="#3b82f6"
              fillOpacity={0.3}
              stroke="#3b82f6"
              strokeWidth={1}
              name="Total Incidents"
            />
            <Bar yAxisId="left" dataKey="resolved" fill="#10b981" name="Resolved" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="responseTime"
              stroke="#ef4444"
              strokeWidth={1}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 2 }}
              name="Avg Response Time (min)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
