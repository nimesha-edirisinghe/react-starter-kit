import { Link, useMatchRoute } from '@tanstack/react-router';

type MultiNavLinkProps = {
  to: string;
  label: string;
  matchPaths: string[];
};

export const MultiNavLink = ({ to, label, matchPaths }: MultiNavLinkProps) => {
  const matchRoute = useMatchRoute();
  const isActive = matchPaths.some((path) => matchRoute({ to: path, includeSearch: false }));

  return (
    <Link
      to={to}
      className={`px-3 py-2 text-slate-700 hover:text-pink-500 transition-colors ${
        isActive ? 'text-pink-600 font-semibold underline underline-offset-4' : ''
      }`}
    >
      {label}
    </Link>
  );
};
