import { Link } from '@tanstack/react-router';

type NavLinkProps = {
  to: string;
  label: string;
  exact?: boolean;
  onClick?: () => void;
};

export const NavLink = ({ to, label, exact = false, onClick }: NavLinkProps) => (
  <Link
    to={to}
    activeProps={{
      className: 'text-primary'
    }}
    activeOptions={{
      exact: exact,
      includeSearch: false,
      includeHash: false
    }}
    className="px-3 py-2 text-foreground hover:text-primary transition-colors"
    onClick={onClick}
  >
    {label}
  </Link>
);
