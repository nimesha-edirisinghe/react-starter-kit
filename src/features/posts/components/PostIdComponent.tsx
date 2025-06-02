import { Link } from '@tanstack/react-router';
import { usePostByIdQuery } from '~/api/queries/usePostsQuery';
import { NotFound } from '~/components/feedback/NotFound';
import { Route } from '~/routes/_protected/posts/$postId';

const PostIdComponent = () => {
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
};

export default PostIdComponent;
