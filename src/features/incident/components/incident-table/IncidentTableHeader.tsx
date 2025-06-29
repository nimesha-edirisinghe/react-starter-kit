import { TableHead, TableHeader, TableRow } from '~/components/ui/table';

export function IncidentTableHeader() {
  return (
    <TableHeader className="bg-[#F7F8F8]">
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Location</TableHead>
        <TableHead>Severity</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Drivers</TableHead>
        <TableHead>Lap</TableHead>
      </TableRow>
    </TableHeader>
  );
}
