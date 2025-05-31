export const postsQueryKeys = {
  all: ['posts'] as const,
  list: () => [...postsQueryKeys.all, 'list'] as const,
  detail: (postId: string) => [...postsQueryKeys.all, 'detail', postId] as const
};
