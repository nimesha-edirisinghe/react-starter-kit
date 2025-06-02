import { useForm } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '~/features/auth/authStore';
import type { LoginFormData } from '~/features/auth/types';
import { useLoginMutation } from './useLoginMutation';

export function useLoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { mutate, isPending, error } = useLoginMutation();

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleSubmit = (data: LoginFormData) => {
    mutate(data, {
      onSuccess: ({ user, token }) => {
        login(user, token);
        navigate({ to: '/' });
      }
    });
  };

  return {
    form,
    handleSubmit,
    isPending,
    error
  };
}
