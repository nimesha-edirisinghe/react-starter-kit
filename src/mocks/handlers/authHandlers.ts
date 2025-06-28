import { http, HttpResponse } from 'msw';
import { mockAllUsers } from '../fixtures/mockAuthData';

export const authHandlers = [
  http.post('/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    // Find user by email and password
    const user = mockAllUsers.find((u) => u.email === email && u.password === password);

    if (user) {
      return HttpResponse.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token: user.token
      });
    }

    return new HttpResponse('Invalid credentials', { status: 401 });
  })
];
