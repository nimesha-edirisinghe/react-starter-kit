import { http, HttpResponse } from 'msw';
import type { UserI } from '~/features/users/types/user';
import { mockUsers } from '../fixtures/mockUsers';

export const userHandlers = [
  http.get('/users', () => {
    return HttpResponse.json(mockUsers);
  }),

  http.get('/users/:id', ({ params }) => {
    const id = Number(params.id);
    const user = mockUsers.find((u) => u.id === id);

    if (!user) {
      return new HttpResponse('User not found', { status: 404 });
    }

    return HttpResponse.json(user);
  }),

  http.post('/users', async ({ request }) => {
    const body = (await request.json()) as Partial<UserI> | undefined;
    if (!body || !body.name || !body.email) {
      return new HttpResponse('Invalid user data', { status: 400 });
    }

    const newUser: UserI = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      role: body.role ?? 'viewer'
    };

    mockUsers.push(newUser);
    return HttpResponse.json(newUser, { status: 201 });
  })
];
