import { TableCell, TableRow } from '~/components/ui/table';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { MoreVertical, Trash2, Edit } from 'lucide-react';
import { useMemo, useState, useCallback } from 'react';
import { SEVERITY_COLORS, STATUS_COLORS } from '../../constants/incident-constants';
import { useDeleteIncidentMutation } from '~/api/mutations/useDeleteIncidentMutation';
import { useEditIncidentMutation } from '~/api/mutations/useEditIncidentMutation';
import { RacingIncident, IncidentFormData } from '../../types/incident';
import DeleteIncidentDialog from '../incident-management/DeleteIncidentDialog';
import EditIncidentDialog from '../incident-management/EditIncidentDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import { capitalizeFirst } from '~/utils/utilsCapitalizeFirst';

interface IncidentRowProps {
  incident: RacingIncident;
}

export const IncidentRow = ({ incident }: IncidentRowProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<IncidentFormData>(() => ({
    type: incident.type,
    raceCategory: incident.raceCategory,
    location: incident.location,
    circuit: incident.circuit,
    severity: incident.severity,
    drivers: incident.drivers.join(', '),
    teams: incident.teams.join(', '),
    lapNumber: incident.lapNumber.toString(),
    raceTime: incident.raceTime || '',
    description: incident.description || '',
    status: incident.status,
    stewardNotes: incident.stewardNotes || ''
  }));

  const deleteIncidentMutation = useDeleteIncidentMutation();
  const editIncidentMutation = useEditIncidentMutation();

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

  const handleEdit = async () => {
    try {
      const formattedData = {
        ...editFormData,
        lapNumber: editFormData.lapNumber
      };

      await editIncidentMutation.mutateAsync({
        id: incident.id,
        incident: formattedData
      });
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error editing incident:', error);
    }
  };

  const handleCloseEditDialog = useCallback(() => {
    setIsEditDialogOpen(false);
    setEditFormData({
      type: incident.type,
      raceCategory: incident.raceCategory,
      location: incident.location,
      circuit: incident.circuit,
      severity: incident.severity,
      drivers: incident.drivers.join(', '),
      teams: incident.teams.join(', '),
      lapNumber: incident.lapNumber.toString(),
      raceTime: incident.raceTime || '',
      description: incident.description || '',
      status: incident.status,
      stewardNotes: incident.stewardNotes || ''
    });
  }, [incident]);

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
          <Badge className={severityColor}>{capitalizeFirst(incident.severity)}</Badge>
        </TableCell>
        <TableCell>
          <Badge className={statusColor}>{capitalizeFirst(incident.status)}</Badge>
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
          <div className="flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setIsEditDialogOpen(true)}
                  className="cursor-pointer"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

      <EditIncidentDialog
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        formData={editFormData}
        onFormDataChange={setEditFormData}
        onSubmit={handleEdit}
        isSubmitting={editIncidentMutation.isPending}
      />
    </>
  );
};
