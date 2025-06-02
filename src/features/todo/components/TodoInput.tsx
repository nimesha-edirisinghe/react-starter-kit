import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

interface TodoInputProps {
  newTodo: string;
  setNewTodo: (value: string) => void;
  onSubmit: () => void;
  isEditing: boolean;
}

export const TodoInput = ({ newTodo, setNewTodo, onSubmit, isEditing }: TodoInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSubmit();
  };

  return (
    <div className="flex gap-2 items-center">
      <Input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add or update todo"
        className="flex-1"
      />
      <Button onClick={onSubmit} className="shrink-0">
        {isEditing ? 'Update' : 'Add'}
      </Button>
    </div>
  );
};
