import { Link } from '@tanstack/react-router';

type NavLinkProps = {
  to: string;
  label: string;
  exact?: boolean;
};

export const NavLink = ({ to, label, exact = false }: NavLinkProps) => (
  <Link
    to={to}
    activeProps={{
      className: 'text-pink-600 font-semibold underline underline-offset-4'
    }}
    {...(exact ? { activeOptions: { exact: true } } : {})}
    className="px-3 py-2 text-slate-700 hover:text-pink-500 transition-colors"
  >
    {label}
  </Link>
);
