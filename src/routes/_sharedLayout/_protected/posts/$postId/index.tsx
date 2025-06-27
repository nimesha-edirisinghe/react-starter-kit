import { createFileRoute } from '@tanstack/react-router';
import { NotFound } from '~/components/feedback/NotFound';
import { PostErrorComponent } from '~/components/feedback/PostError';
import { Link } from '@tanstack/react-router';
import { Skeleton } from '~/components/ui/skeleton';
import { Button } from '~/components/ui/button';
import { Eye } from 'lucide-react';
import { usePostByIdQuery } from '~/api/queries/post/usePostsQuery';

export const Route = createFileRoute('/_sharedLayout/_protected/posts/$postId/')({
  errorComponent: PostErrorComponent,
  component: PostIdComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>;
  }
});

function PostIdComponent() {
  const { postId } = Route.useParams();
  const { data: post, isLoading, isError } = usePostByIdQuery(postId);

  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }

  if (isError || !post) return <NotFound>Post not found</NotFound>;

  return (
    <div className="p-6 space-y-5 rounded-lg border bg-white dark:bg-gray-950 shadow-sm animate-in fade-in slide-in-from-bottom-2">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-foreground">{post.title}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{post.body}</p>
      </div>
      <Button asChild variant="link" className="px-0">
        <Link
          to="/posts/$postId/deep"
          params={{ postId: String(post.id) }}
          activeProps={{ className: 'font-semibold text-primary underline' }}
          className="inline-flex items-center gap-1"
        >
          <Eye className="w-4 h-4" />
          View deep details
        </Link>
      </Button>
    </div>
  );
}
