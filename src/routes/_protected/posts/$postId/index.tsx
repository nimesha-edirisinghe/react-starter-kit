import { createFileRoute } from '@tanstack/react-router';
import { NotFound } from '~/components/feedback/NotFound';
import { PostErrorComponent } from '~/components/feedback/PostError';
import PostIdComponent from '~/features/posts/components/PostIdComponent';

export const Route = createFileRoute('/_protected/posts/$postId/')({
  errorComponent: PostErrorComponent,
  component: PostIdComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>;
  }
});
