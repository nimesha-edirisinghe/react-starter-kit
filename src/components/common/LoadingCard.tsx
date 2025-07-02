import { Card, CardHeader, CardContent } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';

interface LoadingCardProps {
  title?: string;
  message?: string;
  className?: string;
  variant?: 'default' | 'stats' | 'list' | 'chart';
}

export function LoadingCard({
  className = 'col-span-full',
  variant = 'default'
}: LoadingCardProps) {
  const renderSkeletons = () => {
    switch (variant) {
      case 'stats':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        );
      case 'list':
        return (
          <div className="space-y-4 w-full">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        );
      case 'chart':
        return (
          <div className="w-full space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[60px]" />
            </div>
            <Skeleton className="h-[200px] w-full" />
            <div className="flex justify-center gap-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-20" />
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4 w-full">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-32 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        );
    }
  };

  return (
    <Card className={`border border-border bg-card/50 ${className}`}>
      <CardHeader className="flex justify-center"></CardHeader>
      <CardContent className="pt-0">{renderSkeletons()}</CardContent>
    </Card>
  );
}
