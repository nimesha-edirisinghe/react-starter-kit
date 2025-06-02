import { createFileRoute } from '@tanstack/react-router';
import { NotFound } from '~/components/feedback/NotFound';
import UserIdComponent from '~/features/users/components/UserIdComponent';

export const Route = createFileRoute('/_protected/users/$userId/')({
  component: UserIdComponent,
  notFoundComponent: () => {
    return <NotFound>User not found</NotFound>;
  }
});
