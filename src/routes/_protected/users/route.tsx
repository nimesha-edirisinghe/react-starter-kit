import { createFileRoute } from '@tanstack/react-router';
import { MainPageLayout } from '~/components/layout/MainPageLayout/MainPageLayout';
import UserComponent from '~/features/users/components/UserComponent';

export const Route = createFileRoute('/_protected/users')({
  component: UsersLayoutComponent
});

function UsersLayoutComponent() {
  return (
    <MainPageLayout>
      <UserComponent />
    </MainPageLayout>
  );
}
