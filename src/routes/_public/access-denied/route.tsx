import { createFileRoute } from '@tanstack/react-router';
import { AccessDenied } from '~/components/feedback/AccessDenied';

export const Route = createFileRoute('/_public/access-denied')({
  component: AccessDenied
});
