import { WifiOff } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ErrorCardProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  isLoading?: boolean;
}

export function ErrorCard({
  title = 'Failed to Load Data',
  message = 'Unable to fetch data. Please check your connection and try again.',
  onRetry,
  isLoading
}: ErrorCardProps) {
  return (
    <Card className="col-span-full border-red-200 bg-red-50/50">
      <CardHeader className="flex justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-2 rounded-full bg-red-100">
            <WifiOff className="h-5 w-5 text-red-600" />
          </div>
          <div className="text-center">
            <CardTitle className="text-red-900 text-lg">{title}</CardTitle>
            <p className="text-red-700 text-sm mt-1">{message}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex justify-center">
        <div className="flex flex-col items-center gap-3">
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              size="sm"
              className="border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Retrying...' : 'Retry'}
            </Button>
          )}
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            Connection issue detected
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
