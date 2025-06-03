import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from '~/features/todo/components/TodoItem';

const mockTodo = {
  id: '1',
  title: 'Test Todo',
  completed: false
};

describe('TodoItem', () => {
  it('renders todo title correctly', () => {
    render(
      <TodoItem todo={mockTodo} toggleTodo={vi.fn()} startEditing={vi.fn()} removeTodo={vi.fn()} />
    );
    expect(screen.getByText(/Test Todo/i)).toBeInTheDocument();
  });

  it('calls toggleTodo when title is clicked', () => {
    const toggleTodo = vi.fn();
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={toggleTodo}
        startEditing={vi.fn()}
        removeTodo={vi.fn()}
      />
    );
    fireEvent.click(screen.getByText(/Test Todo/i));
    expect(toggleTodo).toHaveBeenCalledWith(mockTodo.id);
  });

  it('calls startEditing when edit button is clicked', () => {
    const startEditing = vi.fn();
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={vi.fn()}
        startEditing={startEditing}
        removeTodo={vi.fn()}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    expect(startEditing).toHaveBeenCalledWith(mockTodo.id, mockTodo.title);
  });

  it('calls removeTodo when delete button is clicked', () => {
    const removeTodo = vi.fn();
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={vi.fn()}
        startEditing={vi.fn()}
        removeTodo={removeTodo}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(removeTodo).toHaveBeenCalledWith(mockTodo.id);
  });

  it('applies line-through class if todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(
      <TodoItem
        todo={completedTodo}
        toggleTodo={vi.fn()}
        startEditing={vi.fn()}
        removeTodo={vi.fn()}
      />
    );

    const todoTitle = screen.getByText(/Test Todo/i);
    expect(todoTitle).toHaveClass('line-through');
  });
});
