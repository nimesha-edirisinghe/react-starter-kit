import { Link, createFileRoute } from '@tanstack/react-router';
import { usePostByIdQuery } from '~/api/queries/usePostsQuery';
import { NotFound } from '~/components/feedback/NotFound';
import { PostErrorComponent } from '~/components/feedback/PostError';

export const Route = createFileRoute('/_authenticated/posts/$postId')({
  errorComponent: PostErrorComponent,
  component: PostComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>;
  }
});

function PostComponent() {
  const { postId } = Route.useParams();
  const { data: post, isLoading, isError } = usePostByIdQuery(postId);

  if (isLoading) return <p className="p-4">Loading post...</p>;
  if (isError || !post) return <NotFound>Post not found</NotFound>;

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{post.title}</h4>
      <div className="text-sm">{post.body}</div>
      <Link
        to="/posts/$postId/deep"
        params={{
          postId: String(post.id)
        }}
        activeProps={{ className: 'text-black font-bold' }}
        className="block py-1 text-blue-800 hover:text-blue-600"
      >
        Deep View
      </Link>
    </div>
  );
}
