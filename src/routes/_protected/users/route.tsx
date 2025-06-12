import { createFileRoute } from '@tanstack/react-router';
import { Link, Outlet } from '@tanstack/react-router';
import { Skeleton } from '~/components/ui/skeleton';
import { ScrollArea } from '~/components/ui/scroll-area';
import { useUsersQuery } from '~/api/queries/user/useUsersQuery';

export const Route = createFileRoute('/_protected/users')({
  component: UsersLayoutComponent
});

function UsersLayoutComponent() {
  const { data, isLoading, isError } = useUsersQuery();
  const users = Array.isArray(data) ? data : [];

  return (
    <div className="flex flex-col md:flex-row min-h-[70vh] border rounded-lg overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2">
      <aside className="w-full md:w-1/4 border-r bg-background p-4">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">Users</h2>
        <ScrollArea className="max-h-[calc(100vh-8rem)] pr-1">
          {isLoading ? (
            <ul className="space-y-3">
              {Array.from({ length: 6 })?.map((_, i) => (
                <Skeleton key={i} className="h-5 w-3/4 rounded-sm" />
              ))}
            </ul>
          ) : isError ? (
            <p className="text-red-500 text-sm">Failed to load users.</p>
          ) : users.length === 0 ? (
            <p className="text-muted-foreground text-sm">No users found.</p>
          ) : (
            <ul className="space-y-2">
              {users?.map((user) => (
                <li key={user.id}>
                  <Link
                    to="/users/$userId"
                    params={{ userId: String(user.id) }}
                    className="block px-3 py-2 rounded-md transition-all text-muted-foreground"
                    activeProps={{
                      className: 'bg-custom-orange-foreground text-primary font-medium'
                    }}
                  >
                    {user.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </aside>
      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
