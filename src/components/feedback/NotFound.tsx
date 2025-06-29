import { Link } from '@tanstack/react-router';
import { ReactNode } from 'react';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function NotFound({ children }: { children?: ReactNode }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6 px-4 animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center gap-3 text-destructive">
        <AlertTriangle className="h-6 w-6 text-destructive" />
        <h1 className="text-xl font-bold">{t('errors.pageNotFound')}</h1>
      </div>

      <div className="text-muted-foreground text-sm max-w-md">
        {children || <p className="text-muted-foreground">{t('errors.pageNotFoundDescription')}</p>}
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2  px-4 py-2 rounded-md font-semibold text-sm transition cursor-pointer text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('common.back')}
        </button>
        <Link
          to="/"
          className="inline-flex items-center text-primary gap-2 border border-primary px-4 py-2 rounded-md font-semibold text-sm transition cursor-pointer"
        >
          <Home className="h-4 w-4" />
          {t('common.home')}
        </Link>
      </div>
    </div>
  );
}
