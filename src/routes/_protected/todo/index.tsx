import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { TodoInput } from '~/features/todo/components/TodoInput';
import { TodoList } from '~/features/todo/components/TodoList';
import { useTodoStore } from '~/features/todo/store/todo-store';

export const Route = createFileRoute('/_protected/todo/')({
  component: TodoComponent
});

export function TodoComponent() {
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const { todos, addTodo, updateTodo, toggleTodo, removeTodo } = useTodoStore();

  const handleAdd = () => {
    if (!newTodo.trim()) return toast.error('Todo cannot be empty');
    if (editingId) {
      updateTodo(editingId, newTodo);
      toast.success('Todo updated');
      setEditingId(null);
    } else {
      addTodo(newTodo);
      toast.success('Todo added');
    }
    setNewTodo('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-12 space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-center text-foreground">
        Manage Your Todos
      </h1>
      <TodoInput
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        onSubmit={handleAdd}
        isEditing={!!editingId}
      />
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        startEditing={(id, title) => {
          setEditingId(id);
          setNewTodo(title);
        }}
        removeTodo={(id) => {
          removeTodo(id);
          toast.success('Todo removed');
        }}
      />
    </div>
  );
}
