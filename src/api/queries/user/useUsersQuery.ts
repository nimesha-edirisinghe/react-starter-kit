import { useQuery } from '@tanstack/react-query';
import { getUserById, getUsers } from '~/api/services/users';

export const useUsersQuery = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 20 * 60 * 1000
  });

export const useUserByIdQuery = (userId: string) =>
  useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
    staleTime: 20 * 60 * 1000
  });
