import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { loginUser } from '~/api/services/auth';

const handleLoginError = (error: AxiosError): string => {
  const status = error?.response?.status;

  switch (status) {
    case 401:
      return 'Invalid email or password';
    case 500:
      return 'Server error. Please try again later.';
    default:
      return 'An error occurred. Please try again.';
  }
};

export const useLoginMutation = () =>
  useMutation({
    mutationFn: loginUser,
    onError: handleLoginError,
    retry: false
  });
