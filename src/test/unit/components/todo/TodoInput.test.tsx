import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoInput } from '~/features/todo/components/TodoInput';

describe('TodoInput', () => {
  const setup = (overrides = {}) => {
    const props = {
      newTodo: '',
      setNewTodo: vi.fn(),
      onSubmit: vi.fn(),
      isEditing: false,
      ...overrides
    };

    render(<TodoInput {...props} />);
    return props;
  };

  it('renders input and Add button when not editing', () => {
    setup();

    expect(screen.getByPlaceholderText(/add or update todo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('renders Update button when editing', () => {
    setup({ isEditing: true });
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });

  it('calls setNewTodo on input change', () => {
    const { setNewTodo } = setup();
    const input = screen.getByPlaceholderText(/add or update todo/i);

    fireEvent.change(input, { target: { value: 'Learn Vitest' } });
    expect(setNewTodo).toHaveBeenCalledWith('Learn Vitest');
  });

  it('calls onSubmit on button click', () => {
    const { onSubmit } = setup();
    const button = screen.getByRole('button', { name: /add/i });

    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalled();
  });

  it('calls onSubmit when Enter is pressed', () => {
    const { onSubmit } = setup();
    const input = screen.getByPlaceholderText(/add or update todo/i);
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(onSubmit).toHaveBeenCalled();
  });
});
