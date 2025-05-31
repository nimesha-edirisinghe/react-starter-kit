import { http, HttpResponse } from 'msw';

export const authHandlers = [
  http.post('/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };
    if (email === 'admin@gmail.com' && password === 'admin123') {
      return HttpResponse.json({
        user: { id: '1', name: 'Admin', email },
        token: 'mock-token-123'
      });
    }
    return new HttpResponse('Invalid credentials', { status: 401 });
  }),

  http.get('/auth/me', ({ request }) => {
    const auth = request.headers.get('Authorization');
    if (auth === 'Bearer mock-token-123') {
      return HttpResponse.json({
        id: '1',
        name: 'Admin',
        email: 'admin@example.com'
      });
    }
    return new HttpResponse('Unauthorized', { status: 401 });
  })
];
