import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import { useLoginForm } from '~/features/auth/hooks/useLoginForm';

export function LoginForm() {
  const { form, handleSubmit, isPending, error } = useLoginForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="email">Email</Label>
              <FormControl>
                <Input id="email" type="email" placeholder="Enter your email" {...field} />
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
                <Input id="password" type="password" placeholder="Enter your password" {...field} />
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
  );
}
