import { Table, TableBody } from '~/components/ui/table';
import { IncidentTableHeader } from './IncidentTableHeader';
import { IncidentRow } from './IncidentRow';
import { TableFooter } from './table-footer/TableFooter';
import { RacingIncident } from '../../types/incident';

interface IncidentDataTableProps {
  incidents: RacingIncident[];
  pagination?: {
    page: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}

export function IncidentDataTable({ incidents, pagination, onPageChange }: IncidentDataTableProps) {
  return (
    <>
      <div className="overflow-x-auto min-w-full">
        <div className="inline-block min-w-full align-middle">
          <Table>
            <IncidentTableHeader />
            <TableBody>
              {incidents.map((incident) => (
                <IncidentRow key={incident.id} incident={incident} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && (
        <TableFooter
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}
