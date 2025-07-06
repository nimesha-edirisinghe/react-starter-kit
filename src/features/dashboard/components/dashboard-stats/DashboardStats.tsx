import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useDashboardStatsQuery } from '~/api/queries/dashboard/useDashboardStatsQuery';
import { ErrorCard } from '~/components/common/ErrorCard';
import { Skeleton } from '~/components/ui/skeleton';

export function DashboardStats() {
  const { data: stats, isLoading, error, refetch } = useDashboardStatsQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-8" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ErrorCard
          title="Failed to Load Dashboard Stats"
          message={
            error?.message ||
            'Unable to fetch dashboard statistics. Please check your connection and try again.'
          }
          onRetry={() => refetch()}
          isLoading={isLoading}
        />
      </div>
    );
  }

  const statsData = [
    {
      title: 'Total Incidents',
      value: stats?.totalIncidents || 0,
      icon: AlertTriangle,
      color: 'text-primary',
      bgColor: 'bg-custom-primary-fill'
    },
    {
      title: 'Investigating',
      value: stats?.investigating || 0,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Resolved',
      value: stats?.resolved || 0,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending',
      value: stats?.pending || 0,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat) => (
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
