import { http, HttpResponse } from 'msw';

export const authHandlers = [
  http.post('/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };
    if (email === 'admin@gmail.com' && password === '1Qaz2wsx#') {
      return HttpResponse.json({
        user: { id: '1', name: 'Admin', email },
        token: 'mock-token-123'
      });
    }
    return new HttpResponse('Invalid credentials', { status: 401 });
  })
];
