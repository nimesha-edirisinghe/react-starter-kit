import { CardTitle } from '~/components/ui/card';

interface TableTitleProps {
  pagination?: {
    page: number;
    limit: number;
  };
  counts?: {
    filtered: number;
  };
}

export function TableTitle({ pagination, counts }: TableTitleProps) {
  return (
    <CardTitle className="flex items-center justify-between">
      <span>All Incidents</span>
      <div className="text-sm text-slate-600">
        {pagination && counts && (
          <>
            Showing {(pagination.page - 1) * pagination.limit + 1}-
            {Math.min(pagination.page * pagination.limit, counts.filtered)} of {counts.filtered}{' '}
            incidents
          </>
        )}
      </div>
    </CardTitle>
  );
}
