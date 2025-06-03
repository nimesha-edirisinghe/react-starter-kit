import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import { TodoComponent } from './TodoComponent';

vi.mock('../store/todo-store', async () => {
  const actual = await vi.importActual<typeof import('../store/todo-store')>('../store/todo-store');
  return {
    ...actual,
    useTodoStore: vi.fn()
  };
});

import { useTodoStore } from '../store/todo-store';
import { toast } from 'react-hot-toast';

vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe('TodoComponent', () => {
  const mockTodos = [
    { id: '1', title: 'First Todo', completed: false },
    { id: '2', title: 'Second Todo', completed: true }
  ];

  const mockStore = {
    todos: mockTodos,
    addTodo: vi.fn(),
    updateTodo: vi.fn(),
    toggleTodo: vi.fn(),
    removeTodo: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useTodoStore as unknown as jest.Mock).mockReturnValue(mockStore);
  });

  it('renders the title and input field', () => {
    render(<TodoComponent />);
    expect(screen.getByText('Manage Your Todos')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Add or update todo/i)).toBeInTheDocument();
  });

  it('shows an error when trying to add empty todo', () => {
    render(<TodoComponent />);
    fireEvent.click(screen.getByText(/add/i));
    expect(toast.error).toHaveBeenCalledWith('Todo cannot be empty');
  });

  it('adds a new todo', () => {
    render(<TodoComponent />);
    fireEvent.change(screen.getByPlaceholderText(/Add or update todo/i), {
      target: { value: 'New Task' }
    });
    fireEvent.click(screen.getByText(/add/i));
    expect(mockStore.addTodo).toHaveBeenCalledWith('New Task');
    expect(toast.success).toHaveBeenCalledWith('Todo added');
  });

  it('removes a todo', () => {
    render(<TodoComponent />);
    const deleteButtons = screen.getAllByLabelText(/delete/i);
    fireEvent.click(deleteButtons[0]);
    expect(mockStore.removeTodo).toHaveBeenCalledWith('1');
  });

  it('edits an existing todo', () => {
    render(<TodoComponent />);
    const editButtons = screen.getAllByLabelText(/edit/i);
    fireEvent.click(editButtons[0]);
    const input = screen.getByPlaceholderText(/add or update todo/i);
    expect(input).toHaveValue('First Todo');
    fireEvent.change(input, { target: { value: 'Updated Task' } });
    fireEvent.click(screen.getByText(/update/i));
    expect(mockStore.updateTodo).toHaveBeenCalledWith('1', 'Updated Task');
  });
});
