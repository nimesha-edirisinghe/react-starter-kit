import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

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
      staleTime: 1000 * 60 * 20, // 20 minutes
      gcTime: 1000 * 60 * 20,
      retry: 3
    },
    mutations: {
      retry: 3,
      onError: handleError
    }
  }
});
