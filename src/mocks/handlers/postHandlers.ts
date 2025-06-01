import { http, HttpResponse } from 'msw';
import { mockPosts } from '../fixtures/mockPosts';

export const postHandlers = [
  http.get('/posts', () => {
    return HttpResponse.json(mockPosts);
  }),

  http.get('/posts/:id', ({ params }) => {
    const id = Number(params.id);
    const post = mockPosts.find((p) => p.id === id);

    if (!post) {
      return new HttpResponse('Post not found', { status: 404 });
    }

    return HttpResponse.json(post);
  })
];
