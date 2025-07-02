import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Activity, TrendingUp, Zap } from 'lucide-react';
import { useLiveDataQuery } from '~/api/queries/live/useLiveDataQuery';
import { LoadingCard } from '~/components/common/LoadingCard';
import { ErrorCard } from '~/components/common/ErrorCard';

export function LiveCharts() {
  const { data, isLoading, isError } = useLiveDataQuery();

  if (isLoading) {
    return <LoadingCard />;
  }

  if (isError) {
    return <ErrorCard />;
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-medium text-slate-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Activity className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Current Incident Rate</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-slate-900">
                    {data!.currentMetrics.incidentRate}
                  </p>
                  <Badge className="bg-red-100 text-red-700 animate-pulse">/min</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Avg Response Time</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-slate-900">
                    {data!.currentMetrics.responseTime}
                  </p>
                  <Badge className="bg-blue-100 text-blue-700">min</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Resolution Rate</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-slate-900">
                    {data!.currentMetrics.resolutionRate.value}%
                  </p>
                  <Badge className="bg-green-100 text-green-700">
                    {data!.currentMetrics.resolutionRate.change >= 0 ? '↑' : '↓'}{' '}
                    {Math.abs(data!.currentMetrics.resolutionRate.change)}%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Incident Timeline */}
        <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center space-x-2">
              <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Live Incident Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={data!.timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="incidents"
                  stroke="#dc2626"
                  fill="#dc2626"
                  fillOpacity={0.2}
                  strokeWidth={1}
                  name="Incidents"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time Trend */}
        <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center space-x-2">
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Response Time Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data!.timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ fill: '#2563eb', strokeWidth: 2, r: 2 }}
                  name="Response Time (min)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
