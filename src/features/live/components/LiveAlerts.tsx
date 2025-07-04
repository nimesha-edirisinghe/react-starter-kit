import { Card, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';
import { TimezoneDate } from '~/components/common/TimezoneDate';
import { useLiveAlertsQuery } from '~/api/queries/live/useLiveAlertsQuery';
import { LoadingCard } from '~/components/common/LoadingCard';
import { ErrorCard } from '~/components/common/ErrorCard';

export function LiveAlerts() {
  const { data: alerts = [], isLoading, error } = useLiveAlertsQuery();
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

  const removeAlert = (id: string) => {
    setDismissedAlerts((prev) => new Set([...prev, id]));
  };

  const getAlertConfig = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-800',
          badge: 'bg-red-500 text-white',
          icon: '🚨'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          text: 'text-yellow-800',
          badge: 'bg-yellow-500 text-white',
          icon: '⚠️'
        };
      case 'info':
        return {
          bg: 'bg-blue-50 border-blue-200',
          text: 'text-blue-800',
          badge: 'bg-blue-500 text-white',
          icon: 'ℹ️'
        };
      default:
        return {
          bg: 'bg-gray-50 border-gray-200',
          text: 'text-gray-800',
          badge: 'bg-gray-500 text-white',
          icon: '📢'
        };
    }
  };

  const visibleAlerts = alerts.filter((alert) => !dismissedAlerts.has(alert.id));

  if (visibleAlerts.length === 0) return null;

  if (isLoading) {
    return <LoadingCard />;
  }

  if (error) {
    return <ErrorCard />;
  }

  return (
    <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
      <CardContent className="px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-semibold text-slate-900">Live Alerts</h3>
            <Badge variant="secondary" className="bg-red-100 text-red-700">
              {visibleAlerts.length}
            </Badge>
          </div>
        </div>

        <div className="space-y-3 max-h-48 overflow-y-auto">
          {visibleAlerts.map((alert) => {
            const config = getAlertConfig(alert.type);
            return (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border ${config.bg} animate-in slide-in-from-top-2 duration-500 shadow-sm`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="text-lg">{config.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className={config.badge} variant="secondary">
                          {alert.type.toUpperCase()}
                        </Badge>
                        <TimezoneDate date={alert.timestamp} format="time" />
                      </div>
                      <p className={`font-medium ${config.text}`}>{alert.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{alert.location}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAlert(alert.id)}
                    className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
