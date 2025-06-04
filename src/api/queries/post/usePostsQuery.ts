import { useQuery } from '@tanstack/react-query';
import { getPostById, getPosts } from '~/api/services/posts';

export const usePostsQuery = () =>
  useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

export const usePostByIdQuery = (postId: string) =>
  useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId
  });
