import { createFileRoute } from '@tanstack/react-router';
import { requireAuth } from '~/utils/requireAuth';

export const Route = createFileRoute('/_protected/posts/')({
  beforeLoad: requireAuth,
  component: PostsIndexComponent
});

function PostsIndexComponent() {
  return <div>Select a post.</div>;
}
