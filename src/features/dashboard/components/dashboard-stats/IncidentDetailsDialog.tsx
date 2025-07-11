import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { Badge } from '~/components/ui/badge';
import {
  AlertTriangle,
  Clock,
  MapPin,
  ChevronDown,
  AlertCircle,
  ShieldAlert,
  AlertOctagon
} from 'lucide-react';
import { capitalizeFirst } from '~/utils/utilsCapitalizeFirst';
import { LoadingCard } from '~/components/common/LoadingCard';
import type { RacingIncident } from '~/features/incident/types/incident';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {} from '~/utils/utilsGetSeverityColor';

interface IncidentDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  status: string;
  incidentsData: RacingIncident[] | { incidents: RacingIncident[] } | undefined;
}

export function IncidentDetailsDialog({
  isOpen,
  onClose,
  status,
  incidentsData
}: IncidentDetailsDialogProps) {
  const [expandedIncident, setExpandedIncident] = useState<string | null>(null);

  if (!incidentsData) {
    return <LoadingCard />;
  }

  const incidents = Array.isArray(incidentsData) ? incidentsData : incidentsData?.incidents || [];
  const filteredIncidents =
    status === 'all'
      ? incidents
      : incidents.filter((incident: RacingIncident) => incident.status === status);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          color: 'bg-red-100 text-red-800',
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50',
          icon: AlertOctagon
        };
      case 'high':
        return {
          color: 'bg-orange-100 text-orange-800',
          iconColor: 'text-orange-600',
          bgColor: 'bg-orange-50',
          icon: ShieldAlert
        };
      case 'medium':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          iconColor: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          icon: AlertTriangle
        };
      case 'low':
        return {
          color: 'bg-green-100 text-green-800',
          iconColor: 'text-green-600',
          bgColor: 'bg-green-50',
          icon: AlertCircle
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          iconColor: 'text-gray-600',
          bgColor: 'bg-gray-50',
          icon: AlertCircle
        };
    }
  };

  const handleToggleExpand = (incidentId: string) => {
    setExpandedIncident(expandedIncident === incidentId ? null : incidentId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-none w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[50vw] max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-lg sm:text-xl font-bold">
            {status === 'all' ? 'All' : capitalizeFirst(status)} Incidents
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4 flex-1 overflow-y-auto px-1 sm:px-2">
          <AnimatePresence>
            {filteredIncidents.map((incident: RacingIncident) => {
              const severityConfig = getSeverityConfig(incident.severity);

              return (
                <motion.div
                  key={incident.id}
                  className={`
                    p-3 sm:p-4 border border-slate-200 rounded-lg space-y-2 sm:space-y-3 
                    hover:border-slate-300 hover:shadow-md transition-all duration-300
                    cursor-pointer relative overflow-hidden
                    ${expandedIncident === incident.id ? `shadow-md ${severityConfig.bgColor}` : ''}
                  `}
                  onClick={() => handleToggleExpand(incident.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                    <div className="flex items-center space-x-2">
                      <motion.div className="rounded-lg">
                        <div className={`p-2 rounded-full ${getSeverityColor(incident.severity)}`}>
                          <AlertTriangle className="h-3 w-3 text-white" />
                        </div>
                      </motion.div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="font-medium text-sm text-slate-900">
                          {incident.type
                            .replace('_', ' ')
                            .replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </span>
                        <Badge variant="outline" className="text-xs w-fit">
                          {incident.raceCategory}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
                      <Badge className={severityConfig.color}>
                        {capitalizeFirst(incident.severity)}
                      </Badge>
                      <motion.div
                        animate={{ rotate: expandedIncident === incident.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: expandedIncident === incident.id ? 'auto' : '0' }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2">
                      <p className="text-slate-600 text-sm">{incident.description}</p>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-500 mt-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className={`h-4 w-4 ${severityConfig.iconColor}`} />
                          <span className="text-xs">
                            {incident.circuit} - {incident.location}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className={`h-4 w-4 ${severityConfig.iconColor}`} />
                          <span className="text-xs">
                            Lap {incident.lapNumber} - {incident.raceTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {filteredIncidents.length === 0 && (
            <motion.div className="text-center py-6 sm:py-8 text-slate-500 text-sm sm:text-base">
              No incidents found with status: {capitalizeFirst(status)}
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
