import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../endpoints/users';
import { UserI } from '~/types/user';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: Partial<UserI>) => createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};
