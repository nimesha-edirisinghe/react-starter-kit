import { Skeleton } from '~/components/ui/skeleton';

export const PostSkeleton = () => {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
    </div>
  );
};
