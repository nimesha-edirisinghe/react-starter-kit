import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend
} from 'recharts';
import { Clock } from 'lucide-react';
import { CustomTooltip } from './chart-tooltips/CustomTooltip';

export function HourlyBarChart({ data }: { data: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <span>Hourly Distribution</span>
        </CardTitle>
        <CardDescription>Incidents by time of day (24-hour format)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="hour" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="incidents" fill="#2563eb" radius={[4, 4, 0, 0]} name="Incidents" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
