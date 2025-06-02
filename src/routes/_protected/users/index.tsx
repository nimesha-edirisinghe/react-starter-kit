import { createFileRoute } from '@tanstack/react-router';
import { UserRoundSearch } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/users/')({
  component: UsersIndexComponent
});

function UsersIndexComponent() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2">
      <UserRoundSearch className="h-10 w-10 text-muted-foreground" />
      <h2 className="text-xl font-semibold">No user selected</h2>
      <p className="text-sm text-muted-foreground">
        Please choose a user from the list on the left.
      </p>
      <Button asChild variant="outline">
        <Link to="/users/$userId" params={{ userId: '1' }}>
          Go to first user
        </Link>
      </Button>
    </div>
  );
}
