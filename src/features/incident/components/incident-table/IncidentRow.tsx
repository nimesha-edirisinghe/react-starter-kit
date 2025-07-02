import { TableCell, TableRow } from '~/components/ui/table';
import { Badge } from '~/components/ui/badge';
import { useMemo } from 'react';
import { SEVERITY_COLORS, STATUS_COLORS } from '../../constants/incident-constants';

export const IncidentRow = ({ incident }: { incident: any }) => {
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

  return (
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
    </TableRow>
  );
};
