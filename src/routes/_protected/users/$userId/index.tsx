import { createFileRoute } from '@tanstack/react-router';
import { NotFound } from '~/components/feedback/NotFound';
import { useUserByIdQuery } from '~/api/index';
import { Skeleton } from '~/components/ui/skeleton';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export const Route = createFileRoute('/_protected/users/$userId/')({
  component: UserIdComponent,
  notFoundComponent: () => {
    return <NotFound>User not found</NotFound>;
  }
});

function UserIdComponent() {
  const { userId } = Route.useParams();
  const { data: user, isLoading, isError } = useUserByIdQuery(userId);

  if (isLoading) {
    return (
      <Card className="max-w-md mx-auto p-6 space-y-4 animate-pulse">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      </Card>
    );
  }

  if (isError || !user) {
    return (
      <div className="p-6">
        <NotFound>User not found</NotFound>
      </div>
    );
  }

  return (
    <Card className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-2">
      <CardHeader className="flex flex-col items-center space-y-2">
        <Avatar className="h-14 w-14">
          <AvatarFallback>{user.name?.charAt(0) ?? ''}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-lg font-semibold">{user.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground text-center">
        <p>{user.email}</p>
      </CardContent>
    </Card>
  );
}
