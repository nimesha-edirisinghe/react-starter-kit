import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTodoStore } from '../store/todo-store';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';

export const TodoComponent = () => {
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
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Manage Your Todos</h1>
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
};
