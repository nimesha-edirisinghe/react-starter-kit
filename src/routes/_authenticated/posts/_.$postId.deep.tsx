import { Link, createFileRoute } from '@tanstack/react-router';
import { PostErrorComponent } from '~/components/feedback/PostError';
import { usePostByIdQuery } from '~/api/queries/usePostsQuery';

export const Route = createFileRoute('/_authenticated/posts/_/$postId/deep')({
  errorComponent: PostErrorComponent,
  component: PostDeepComponent
});

function PostDeepComponent() {
  const { postId } = Route.useParams();
  const { data: post, isLoading, isError } = usePostByIdQuery(postId);

  if (isLoading) return <p className="p-4">Loading post...</p>;
  if (isError || !post) return <p className="p-4 text-red-500">Post not found</p>;

  return (
    <div className="p-2 space-y-2">
      <Link to="/posts" className="block py-1 text-blue-800 hover:text-blue-600">
        ← All Posts
      </Link>
      <h4 className="text-xl font-bold underline">{post.title}</h4>
      <div className="text-sm">{post.body}</div>
    </div>
  );
}
