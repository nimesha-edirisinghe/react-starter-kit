import { ErrorComponent, Link, rootRouteId, useMatch, useRouter } from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { clsx } from 'clsx';
import log from '~/utils/log';

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();

  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId
  });

  log.error('DefaultCatchBoundary Error:', error);

  const buttonClasses = clsx(
    'px-3 py-1 rounded text-white uppercase font-bold bg-gray-600 dark:bg-gray-700 hover:opacity-90 transition'
  );

  return (
    <div className="min-w-0 flex-1 p-6 flex flex-col items-center justify-center gap-6 text-center">
      <ErrorComponent error={error} />

      <div className="flex gap-3 items-center flex-wrap">
        <button onClick={() => router.invalidate()} className={buttonClasses}>
          Try Again
        </button>

        {isRoot ? (
          <Link to="/" className={buttonClasses}>
            Home
          </Link>
        ) : (
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
            className={buttonClasses}
          >
            Go Back
          </Link>
        )}
      </div>
    </div>
  );
}
