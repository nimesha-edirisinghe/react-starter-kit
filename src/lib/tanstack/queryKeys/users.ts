export const usersQueryKeys = {
  all: ['users'] as const,
  list: () => [...usersQueryKeys.all, 'list'] as const,
  detail: (userId: string) => [...usersQueryKeys.all, 'detail', userId] as const
};
