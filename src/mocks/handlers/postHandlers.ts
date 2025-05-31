import { http, HttpResponse } from 'msw';
import type { PostI } from '~/types/post';

const mockPosts: PostI[] = [
  { id: 1, title: 'First Post', body: 'This is the first post.' },
  { id: 2, title: 'Second Post', body: 'Another post content.' },
  { id: 3, title: 'Mocked News', body: 'MSW is now mocking posts!' }
];

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
