import { useQuery } from '@tanstack/react-query';
import { getPosts, getPostById } from '../services/posts';

export const usePostsQuery = () =>
  useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 10 * 1000
  });

export const usePostByIdQuery = (postId: string) =>
  useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
    staleTime: 10 * 1000
  });
