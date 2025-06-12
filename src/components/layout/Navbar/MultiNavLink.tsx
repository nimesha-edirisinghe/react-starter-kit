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
      className={`px-3 py-2 text-foreground hover:text-primary transition-colors ${
        isActive ? 'text-primary' : ''
      }`}
    >
      {label}
    </Link>
  );
};
