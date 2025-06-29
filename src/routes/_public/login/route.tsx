import { createFileRoute } from '@tanstack/react-router';
import { AuthLayout } from '~/features/auth/components/AuthLayout';
import { LoginForm } from '~/features/auth/components/LoginForm';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_public/login')({
  component: LoginPage
});

export function LoginPage() {
  const { t } = useTranslation();

  return (
    <AuthLayout
      title={t('common.welcome')}
      description={t('common.enterCredentials')}
      footer={t('common.contactAdmin')}
    >
      <LoginForm />
    </AuthLayout>
  );
}
