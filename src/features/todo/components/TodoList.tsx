import { Todo } from '../store/todoStore';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  startEditing: (id: string, title: string) => void;
  removeTodo: (id: string) => void;
}

export const TodoList = ({ todos, toggleTodo, startEditing, removeTodo }: TodoListProps) => (
  <ul className="space-y-3">
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        toggleTodo={toggleTodo}
        startEditing={startEditing}
        removeTodo={removeTodo}
      />
    ))}
  </ul>
);
