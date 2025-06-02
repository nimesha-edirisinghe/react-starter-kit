import { useMutation } from '@tanstack/react-query';
import { createUser } from '../services/users';
import { UserI } from '~/types/user';
import { queryClient } from '~/lib/tanstack/query';

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (user: Partial<UserI>) => createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};
