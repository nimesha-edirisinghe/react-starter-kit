import { useAuthStore } from './store';
import { useQuery, useMutation } from '@tanstack/react-query';
import { loginUser, fetchCurrentUser } from '~/api/endpoints/auth';

export const useAuth = () => {
  const { user, token, login, logout } = useAuthStore();
  return { user, token, login, logout };
};

export const useLoginMutation = () =>
  useMutation({
    mutationFn: loginUser
  });

export const useCurrentUserQuery = () =>
  useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    enabled: !!useAuthStore.getState().token
  });
