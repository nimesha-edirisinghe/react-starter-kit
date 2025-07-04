import { createFileRoute } from '@tanstack/react-router';
import { requireRole } from '~/features/auth/guards/require-role';
import {} from '~/features/auth/components/AuthGuard';
import LivePageWrapper from '~/features/live/components/live-page-wrapper/LivePageWrapper';

export const Route = createFileRoute('/_protected/live')({
  beforeLoad: () => requireRole(['admin', 'steward', 'viewer']),
  component: ViewerLiveComponent
});

function ViewerLiveComponent() {
  return <LivePageWrapper />;
}
