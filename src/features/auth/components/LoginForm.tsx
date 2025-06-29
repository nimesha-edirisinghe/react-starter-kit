import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import { useLoginForm } from '~/features/auth/hooks/useLoginForm';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export function LoginForm() {
  const { form, handleSubmit, isPending, error } = useLoginForm();
  const { t } = useTranslation();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 select-none">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="email" className="text-foreground">
                {t('common.email')}
              </Label>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.emailPlaceholder')}
                  className={clsx(error && 'border-destructive')}
                  autoCapitalize="none"
                  autoCorrect="off"
                  {...field}
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
              <Label htmlFor="password" className="text-foreground">
                {t('common.password')}
              </Label>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('auth.passwordPlaceholder')}
                  className={clsx(error && 'border-destructive')}
                  autoCapitalize="none"
                  autoCorrect="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <p className="text-sm text-destructive -mt-2">{t('auth.invalidCredentials')}</p>}

        <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
          {isPending ? t('auth.loggingIn') : t('auth.loginButton')}
        </Button>
      </form>
    </Form>
  );
}
