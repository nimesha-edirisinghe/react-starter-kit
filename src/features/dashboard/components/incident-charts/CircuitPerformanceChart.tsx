import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts';
import { MapPin } from 'lucide-react';
import { CustomTooltip } from './chart-tooltips/CustomTooltip';

export function CircuitPerformanceChart({ data }: { data: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span>Circuit Performance</span>
        </CardTitle>
        <CardDescription>Incidents vs resolution rates by circuit</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="circuit" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="incidents" fill="#fe6f62" name="Total Incidents" radius={[2, 2, 0, 0]} />
            <Bar dataKey="resolved" fill="#10b981" name="Resolved" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
