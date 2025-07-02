import { TableCell, TableRow } from '~/components/ui/table';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { SEVERITY_COLORS, STATUS_COLORS } from '../../constants/incident-constants';
import { useDeleteIncidentMutation } from '~/api/mutations/useDeleteIncidentMutation';
import { RacingIncident } from '../../types/incident';
import DeleteIncidentDialog from '../incident-management/DeleteIncidentDialog';

interface IncidentRowProps {
  incident: RacingIncident;
}

export const IncidentRow = ({ incident }: IncidentRowProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const deleteIncidentMutation = useDeleteIncidentMutation();

  const formattedType = useMemo(
    () => incident.type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
    [incident.type]
  );

  const visibleDrivers = useMemo(() => incident.drivers.slice(0, 2), [incident.drivers]);
  const hasMoreDrivers = incident.drivers.length > 2;
  const additionalDriversCount = incident.drivers.length - 2;

  const severityColor =
    SEVERITY_COLORS[incident.severity as keyof typeof SEVERITY_COLORS] || SEVERITY_COLORS.default;
  const statusColor =
    STATUS_COLORS[incident.status as keyof typeof STATUS_COLORS] || STATUS_COLORS.default;

  const handleDelete = async () => {
    try {
      await deleteIncidentMutation.mutateAsync(incident.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting incident:', error);
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>{formattedType}</TableCell>
        <TableCell>
          <Badge variant="outline">{incident.raceCategory}</Badge>
        </TableCell>
        <TableCell>
          <div>
            <div className="font-medium">{incident.circuit}</div>
            <div className="text-sm text-slate-500">{incident.location}</div>
          </div>
        </TableCell>
        <TableCell>
          <Badge className={severityColor}>{incident.severity}</Badge>
        </TableCell>
        <TableCell>
          <Badge className={statusColor}>{incident.status}</Badge>
        </TableCell>
        <TableCell>
          <div className="space-y-1">
            {visibleDrivers.map((driver: string, index: number) => (
              <div key={index} className="text-sm">
                {driver}
              </div>
            ))}
            {hasMoreDrivers && (
              <div className="text-xs text-slate-500">+{additionalDriversCount} more</div>
            )}
          </div>
        </TableCell>
        <TableCell>{incident.lapNumber}</TableCell>
        <TableCell className="text-center">
          <div className="flex items-center justify-center ">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="cursor-pointer h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
              disabled={deleteIncidentMutation.isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <DeleteIncidentDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        isDeleting={deleteIncidentMutation.isPending}
        incidentType={formattedType}
      />
    </>
  );
};
