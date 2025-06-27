import { createFileRoute } from '@tanstack/react-router';
import { UserRoundSearch } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Link } from '@tanstack/react-router';
import { requireRole } from '~/features/auth/guards/require-role';

export const Route = createFileRoute('/_sharedLayout/_protected/users/')({
  beforeLoad: () => requireRole(['admin']),
  component: UsersIndexComponent
});

function UsersIndexComponent() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 select-none">
      <UserRoundSearch className="h-10 w-10 text-primary" />
      <h2 className="text-xl font-semibold">No user selected</h2>
      <p className="text-sm text-muted-foreground">
        Please choose a user from the list on the left.
      </p>
      <Button
        asChild
        variant="outline"
        className="border border-primary text-primary hover:text-primary hover:bg-custom-orange-foreground"
      >
        <Link to="/users/$userId" params={{ userId: '1' }}>
          Go to first user
        </Link>
      </Button>
    </div>
  );
}
