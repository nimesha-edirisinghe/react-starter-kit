import { useMutation } from '@tanstack/react-query';
import { loginUser } from '~/api/services/auth';

export const useLoginMutation = () =>
  useMutation({
    mutationFn: loginUser
  });
