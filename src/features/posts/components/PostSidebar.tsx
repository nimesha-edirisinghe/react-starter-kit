import { BookOpen } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Skeleton } from '~/components/ui/skeleton';
import { usePostsQuery } from '~/api/queries/post/usePostsQuery';

export const PostSidebar = () => {
  const { data: posts = [], isLoading, isError } = usePostsQuery();

  return (
    <aside className="w-full md:w-1/4 border-r bg-gray-50 dark:bg-gray-900 p-4">
      <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 pb-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          All Posts
        </h2>
      </div>

      <div className="mt-2 max-h-[calc(100vh-8rem)] pr-1">
        {isLoading ? (
          <ul className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full rounded-sm" />
            ))}
          </ul>
        ) : isError ? (
          <p className="text-red-500 text-sm mt-2">Failed to load posts.</p>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground text-sm mt-2">No posts found.</p>
        ) : (
          <ul className="space-y-2 mt-2">
            {posts.map((post) => (
              <li key={post.id}>
                <Link
                  to="/posts/$postId"
                  params={{ postId: String(post.id) }}
                  className="block px-3 py-2 rounded-md transition-all hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                  activeProps={{
                    className: 'bg-primary text-white font-semibold shadow-sm'
                  }}
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};
