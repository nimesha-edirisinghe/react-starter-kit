import { createFileRoute } from '@tanstack/react-router';
import { PostErrorComponent } from '~/components/feedback/PostError';
import PostDeepComponent from '~/features/posts/components/PostDeepComponent';

export const Route = createFileRoute('/_protected/posts/_/$postId/deep')({
  errorComponent: PostErrorComponent,
  component: PostDeepComponent
});
