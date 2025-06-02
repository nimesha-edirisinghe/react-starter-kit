import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { queryKeys } from './queryKeys';

const handleError = (error: unknown) => {
  if (error instanceof Error) {
    toast.error(error.message || 'An unexpected error occurred');
  } else {
    toast.error('An unexpected error occurred');
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
      gcTime: 1000 * 60 * 5,
      retry: 3
    },
    mutations: {
      retry: 1,
      onError: handleError
    }
  }
});

export const dehydrateQueryClient = async () => {
  const dehydratedState = await queryClient.getQueryData(queryKeys.users.list());
  return dehydratedState;
};

export const hydrateQueryClient = async (dehydratedState: unknown) => {
  if (dehydratedState) {
    await queryClient.setQueryData(queryKeys.users.list(), dehydratedState);
  }
};
