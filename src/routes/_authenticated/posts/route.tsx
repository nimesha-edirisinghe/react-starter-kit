import { Link, Outlet, createFileRoute } from '@tanstack/react-router';
import { usePostsQuery } from '~/api/queries/usePostsQuery';

export const Route = createFileRoute('/_authenticated/posts')({
  component: PostsLayoutComponent
});

function PostsLayoutComponent() {
  const { data: posts = [], isLoading, isError } = usePostsQuery();

  if (isLoading) return <p className="p-4">Loading posts...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load posts</p>;

  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {[...posts].map((post) => {
          return (
            <li key={post.id} className="whitespace-nowrap">
              <Link
                to="/posts/$postId"
                params={{
                  postId: String(post.id)
                }}
                className="block py-1 text-blue-800 hover:text-blue-600"
                activeProps={{ className: 'text-black font-bold' }}
              >
                <div>{post.title}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
