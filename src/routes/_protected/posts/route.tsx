import { createFileRoute } from '@tanstack/react-router';
import { MainPageLayout } from '~/components/layout/MainPageLayout/MainPageLayout';
import PostsComponent from '~/features/posts/components/PostsComponent';

export const Route = createFileRoute('/_protected/posts')({
  component: PostsLayoutComponent
});

function PostsLayoutComponent() {
  return (
    <MainPageLayout>
      <PostsComponent />
    </MainPageLayout>
  );
}
