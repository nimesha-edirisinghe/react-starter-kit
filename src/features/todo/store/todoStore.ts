import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (title: string) => void;
  updateTodo: (id: string, title: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      (set) => ({
        todos: [],
        addTodo: (title) =>
          set(
            (state) => ({
              todos: [...state.todos, { id: Date.now().toString(), title, completed: false }]
            }),
            false,
            'todo/addTodo'
          ),
        updateTodo: (id, title) =>
          set(
            (state) => ({
              todos: state.todos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
            }),
            false,
            'todo/updateTodo'
          ),
        toggleTodo: (id) =>
          set(
            (state) => ({
              todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
              )
            }),
            false,
            'todo/toggleTodo'
          ),
        removeTodo: (id) =>
          set(
            (state) => ({
              todos: state.todos.filter((todo) => todo.id !== id)
            }),
            false,
            'todo/removeTodo'
          )
      }),
      {
        name: 'todo-storage'
      }
    ),
    {
      name: 'TodoStore'
    }
  )
);
