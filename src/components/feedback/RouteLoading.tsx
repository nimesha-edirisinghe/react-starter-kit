import { Skeleton } from '~/components/ui/skeleton';

export function RouteLoading() {
  return (
    <div className="flex flex-col max-w-6xl mx-auto p-4 pt-12">
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
