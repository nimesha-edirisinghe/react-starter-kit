import { createFileRoute } from '@tanstack/react-router';
import { requireAuth } from '~/features/auth/guards/require-auth';

export const Route = createFileRoute('/_protected')({
  beforeLoad: requireAuth
});
