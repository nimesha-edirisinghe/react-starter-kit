import { useMutation } from '@tanstack/react-query';
import { createUser } from '~/api/services/users';
import { UserI } from '~/features/users/types/user';
import { queryClient } from '~/lib/tanstack/query';

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (user: Partial<UserI>) => createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};
