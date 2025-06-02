import { useQuery } from '@tanstack/react-query';
import { getUsers, getUserById } from '../services/users';

export const useUsersQuery = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000
  });

export const useUserByIdQuery = (userId: string) =>
  useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000
  });
