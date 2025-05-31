import { PostI } from '~/types/post';
import { apiClient } from '../client';

export const getPosts = async (): Promise<PostI[]> => {
  const res = await apiClient.get('/posts');
  return res.data;
};

export const getPostById = async (postId: string): Promise<PostI> => {
  try {
    const id = parseInt(postId, 10);
    if (isNaN(id)) throw new Error('Invalid post ID');
    const res = await apiClient.get(`/posts/${id}`);
    return res.data;
  } catch (error) {
    console.error('Endpoint: getPostById failed', error);
    throw new Error('Failed to fetch post');
  }
};
