import { createFileRoute, Link } from '@tanstack/react-router';
import { PostErrorComponent } from '~/components/feedback/PostError';
import { usePostByIdQuery } from '~/api/queries/usePostsQuery';
import { Button } from '~/components/ui/button';
import { PostDetailCard } from '~/features/posts/components/PostDetailCard';
import { PostSkeleton } from '~/features/posts/components/PostSkeleton';

export const Route = createFileRoute('/_protected/posts/_/$postId/deep')({
  errorComponent: PostErrorComponent,
  component: PostDeepComponent
});

function PostDeepComponent() {
  const { postId } = Route.useParams();
  const { data: post, isLoading, isError } = usePostByIdQuery(postId);

  if (isLoading) {
    return <PostSkeleton />;
  }
  if (isError || !post) {
    return (
      <div className="p-6 text-center text-red-500 text-sm">
        Post not found. Please check the link or go back.
      </div>
    );
  }
  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="text-sm text-muted-foreground">
        <Link to="/posts" className="hover:text-primary underline transition-colors">
          ← Back to Posts
        </Link>
      </div>
      <PostDetailCard title={post.title} body={post.body} />
      <div className="flex justify-end">
        <Button asChild variant="outline">
          <Link to="/posts">Browse More Posts</Link>
        </Button>
      </div>
    </div>
  );
}
