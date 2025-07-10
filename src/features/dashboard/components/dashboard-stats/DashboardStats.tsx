import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { AlertTriangle, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { useDashboardStatsQuery } from '~/api/queries/dashboard/useDashboardStatsQuery';
import { ErrorCard } from '~/components/common/ErrorCard';
import { Skeleton } from '~/components/ui/skeleton';
import { useState } from 'react';
import { IncidentDetailsDialog } from './IncidentDetailsDialog';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

export function DashboardStats() {
  const { data: stats, isLoading, error, refetch } = useDashboardStatsQuery();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
      bgColor: 'bg-custom-primary-fill',
      hoverBgColor: 'hover:bg-primary/5',
      status: 'all',
      description: 'View all racing incidents'
    },
    {
      title: 'Investigating',
      value: stats?.investigating || 0,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      hoverBgColor: 'hover:bg-yellow-100/50',
      status: 'investigating',
      description: 'Incidents under investigation'
    },
    {
      title: 'Resolved',
      value: stats?.resolved || 0,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      hoverBgColor: 'hover:bg-green-100/50',
      status: 'resolved',
      description: 'Completed investigations'
    },
    {
      title: 'Pending',
      value: stats?.pending || 0,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      hoverBgColor: 'hover:bg-red-100/50',
      status: 'pending',
      description: 'Awaiting investigation'
    }
  ];

  const handleCardClick = (status: string) => {
    setSelectedStatus(status);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <MotionCard
            key={stat.title}
            className={`cursor-pointer group relative ${stat.hoverBgColor} transition-all duration-300`}
            onClick={() => handleCardClick(stat.status)}
            onHoverStart={() => setHoveredCard(stat.title)}
            onHoverEnd={() => setHoveredCard(null)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
              <div
                className={`p-2 rounded-lg ${stat.bgColor} transition-transform duration-300 group-hover:scale-110`}
              >
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-sm text-slate-500">{stat.description}</p>
              </div>
              <div
                className={`absolute bottom-4 right-4 opacity-0 transform translate-x-2 transition-all duration-300 ${hoveredCard === stat.title ? 'opacity-100 translate-x-0' : ''}`}
              >
                <ArrowRight className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardContent>
          </MotionCard>
        ))}
      </div>

      {selectedStatus && (
        <IncidentDetailsDialog
          isOpen={true}
          onClose={() => setSelectedStatus(null)}
          status={selectedStatus}
        />
      )}
    </>
  );
}
