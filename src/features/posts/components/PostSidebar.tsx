import { Link } from '@tanstack/react-router';
import { Skeleton } from '~/components/ui/skeleton';
import { usePostsQuery } from '~/api/queries/post/usePostsQuery';

export const PostSidebar = () => {
  const { data, isLoading, isError } = usePostsQuery();
  const posts = Array.isArray(data) ? data : [];

  return (
    <aside className="w-full md:w-1/4 border-r bg-background p-4">
      <div className="sticky top-0 z-10 bg-background pb-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">All Posts</h2>
      </div>
      <div className="mt-2 max-h-[calc(100vh-8rem)] pr-1">
        {isLoading ? (
          <ul className="space-y-3">
            {Array.from({ length: 6 })?.map((_, i) => (
              <Skeleton key={i} className="h-5 w-full rounded-sm" />
            ))}
          </ul>
        ) : isError ? (
          <p className="text-destructive text-sm mt-2">Failed to load posts.</p>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground text-sm mt-2">No posts found.</p>
        ) : (
          <ul className="space-y-2 mt-2">
            {posts?.map((post) => (
              <li key={post.id}>
                <Link
                  to="/posts/$postId"
                  params={{ postId: String(post.id) }}
                  className="block px-3 py-2 rounded-md transition-all  text-muted-foreground"
                  activeProps={{
                    className: 'bg-custom-orange-foreground text-primary font-semibold shadow-sm'
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
