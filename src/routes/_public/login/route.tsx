import { createFileRoute } from '@tanstack/react-router';
import { AuthLayout } from '~/features/auth/components/AuthLayout';
import { LoginForm } from '~/features/auth/components/LoginForm';

export const Route = createFileRoute('/_public/login')({
  component: LoginPage
});

export function LoginPage() {
  return (
    <AuthLayout
      title="Welcome"
      description="Enter your credentials to log in"
      footer="Don't have an account? Contact admin"
    >
      <LoginForm />
    </AuthLayout>
  );
}
