import { http, HttpResponse } from 'msw';
import { mockAuthUser } from '../fixtures/mockAuthData';

export const authHandlers = [
  http.post('/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };
    if (email === mockAuthUser.email && password === mockAuthUser.password) {
      return HttpResponse.json({
        user: {
          id: mockAuthUser.id,
          name: mockAuthUser.name,
          email: mockAuthUser.email
        },
        token: mockAuthUser.token
      });
    }
    return new HttpResponse('Invalid credentials', { status: 401 });
  })
];
