import { createFileRoute } from '@tanstack/react-router';
import { PostErrorComponent } from '~/components/feedback/PostError';
import { Link } from '@tanstack/react-router';
import { usePostByIdQuery } from '~/api/queries/usePostsQuery';
import { Skeleton } from '~/components/ui/skeleton';
import { Button } from '~/components/ui/button';

export const Route = createFileRoute('/_protected/posts/_/$postId/deep')({
  errorComponent: PostErrorComponent,
  component: PostDeepComponent
});

function PostDeepComponent() {
  const { postId } = Route.useParams();
  const { data: post, isLoading, isError } = usePostByIdQuery(postId);

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
      </div>
    );
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
      <div className="rounded-lg border bg-background p-5 shadow-sm transition hover:shadow-md">
        <h2 className="text-2xl font-semibold text-primary mb-2">{post.title}</h2>
        <p className="text-muted-foreground leading-relaxed">{post.body}</p>
      </div>
      <div className="flex justify-end">
        <Button asChild variant="outline">
          <Link to="/posts">Browse More Posts</Link>
        </Button>
      </div>
    </div>
  );
}
