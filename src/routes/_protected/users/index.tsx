import { createFileRoute } from '@tanstack/react-router';
import { requireAuth } from '~/utils/requireAuth';

export const Route = createFileRoute('/_protected/users/')({
  beforeLoad: requireAuth,
  component: UsersIndexComponent
});

function UsersIndexComponent() {
  return <div>Select a user.</div>;
}
