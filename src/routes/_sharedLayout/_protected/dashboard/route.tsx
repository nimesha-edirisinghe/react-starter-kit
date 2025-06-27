import { createFileRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import { requireRole } from '~/features/auth/guards/require-role';
import { PostSidebar } from '~/features/posts/components/PostSidebar';

export const Route = createFileRoute('/_sharedLayout/_protected/dashboard')({
  beforeLoad: () => requireRole(['admin', 'steward']),
  component: PostsLayoutComponent
});

function PostsLayoutComponent() {
  return (
    <div className="flex flex-col md:flex-row h-full min-h-[70vh] border rounded-lg overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2">
      <PostSidebar />
      <main className="flex-1 p-4 overflow-y-auto animate-in fade-in duration-300 ease-in-out">
        <Outlet />
      </main>
    </div>
  );
}
