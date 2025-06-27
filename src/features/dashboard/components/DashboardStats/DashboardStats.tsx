import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { mockIncidents } from '~/mocks/fixtures/mockIncidents';

export function DashboardStats() {
  const totalIncidents = mockIncidents.length;
  const investigating = mockIncidents.filter((i) => i.status === 'investigating').length;
  const resolved = mockIncidents.filter((i) => i.status === 'resolved').length;
  const pending = mockIncidents.filter((i) => i.status === 'pending').length;

  const stats = [
    {
      title: 'Total Incidents',
      value: totalIncidents,
      icon: AlertTriangle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Investigating',
      value: investigating,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Resolved',
      value: resolved,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending',
      value: pending,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
