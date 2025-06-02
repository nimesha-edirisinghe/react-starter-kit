import { createFileRoute } from '@tanstack/react-router';
import { TodoComponent } from '~/features/todo/components/TodoComponent';

export const Route = createFileRoute('/_protected/todo/')({
  component: TodoComponent
});
