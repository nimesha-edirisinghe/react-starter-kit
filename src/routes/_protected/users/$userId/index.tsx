import { createFileRoute } from '@tanstack/react-router';
import { useUserByIdQuery } from '~/api/index';
import { NotFound } from '~/components/feedback/NotFound';

export const Route = createFileRoute('/_protected/users/$userId/')({
  errorComponent: UserComponent,
  component: UserComponent,
  notFoundComponent: () => {
    return <NotFound>User not found</NotFound>;
  }
});

function UserComponent() {
  const { userId } = Route.useParams();
  const { data: user, isLoading, isError } = useUserByIdQuery(userId);

  if (isLoading) return <p className="p-4">Loading user...</p>;
  if (isError || !user) return <NotFound>User not found</NotFound>;

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{user.name}</h4>
      <div className="text-sm">{user.email}</div>
    </div>
  );
}
