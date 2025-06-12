import { useForm } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '~/features/auth/store/auth-store';
import type { LoginFormData } from '~/features/auth/types/auth';
import { useLoginMutation } from './useLoginMutation';

export function useLoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { mutate, isPending, error, reset } = useLoginMutation();

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleSubmit = (data: LoginFormData) => {
    reset();

    mutate(data, {
      onSuccess: ({ user, token }) => {
        login(user, token);
        navigate({ to: '/' });
      },
      onError: () => {
        form.setValue('password', '');
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
