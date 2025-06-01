import { createFileRoute } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '~/features/auth/hooks';
import { useAuthStore } from '~/features/auth/store';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '~/components/ui/card';
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
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-xl border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to log in</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input id="email" type="email" placeholder="you@example.com" {...field} />
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
                      <Input id="password" type="password" placeholder="••••••••" {...field} />
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
        </CardContent>

        <CardFooter className="text-xs text-muted-foreground justify-center">
          Don’t have an account? Contact admin
        </CardFooter>
      </Card>
    </div>
  );
}
