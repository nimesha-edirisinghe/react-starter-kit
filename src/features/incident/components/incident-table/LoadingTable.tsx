import { Table, TableBody } from '~/components/ui/table';
import { Skeleton } from '~/components/ui/skeleton';
import { IncidentTableHeader } from './IncidentTableHeader';

export function LoadingTable() {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto min-w-full">
        <div className="inline-block min-w-full align-middle">
          <Table>
            <IncidentTableHeader />
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b">
                  {[...Array(8)].map((_, cellIndex) => (
                    <td key={cellIndex} className="p-4">
                      <Skeleton className="h-6 w-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
