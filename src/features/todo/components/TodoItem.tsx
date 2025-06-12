import { Button } from '~/components/ui/button';
import { cn } from '~/utils/utils';
import { Todo } from '../store/todo-store';
import { Pencil, Trash2 } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  startEditing: (id: string, title: string) => void;
  removeTodo: (id: string) => void;
}

export const TodoItem = ({ todo, toggleTodo, startEditing, removeTodo }: TodoItemProps) => {
  return (
    <li className="group flex flex-col sm:flex-row sm:justify-between sm:items-center border border-border hover:shadow-md p-3 rounded-md transition-all gap-2 sm:gap-0">
      <div className="flex items-center gap-3 w-full">
        <span
          onClick={() => toggleTodo(todo.id)}
          className={cn(
            'text-sm cursor-pointer truncate flex-1',
            todo.completed && 'line-through text-muted-foreground'
          )}
        >
          {todo.title}
        </span>
      </div>

      <div className="flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity justify-end sm:justify-start">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 cursor-pointer"
          onClick={() => startEditing(todo.id, todo.title)}
          aria-label="edit"
        >
          <Pencil className="h-4 w-4 text-primary" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 cursor-pointer"
          onClick={() => removeTodo(todo.id)}
          aria-label="delete"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </li>
  );
};
