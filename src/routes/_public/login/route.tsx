import { createFileRoute } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '~/features/auth/hooks';
import { useAuthStore } from '~/features/auth/store';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

export const Route = createFileRoute('/_public/login')({
  component: LoginPage
});

interface LoginFormData {
  email: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { mutate, isPending, error } = useLoginMutation();

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleSubmit = (data: LoginFormData) => {
    mutate(data, {
      onSuccess: ({ user, token }) => {
        login(user, token);
        navigate({ to: '/' });
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email</Label>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      {...field}
                      placeholder="Enter your email"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">Password</Label>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      {...field}
                      placeholder="Enter your password"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-sm text-red-600 -mt-2">Invalid credentials</p>}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
