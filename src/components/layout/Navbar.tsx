import { Link, useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '~/features/auth/store';

export const NavBar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  return (
    <nav className="px-6 py-3 bg-white shadow flex justify-between items-center">
      {isAuthenticated && (
        <div className="flex gap-4 text-gray-700">
          <NavLink to="/" label="Home" exact />
          <NavLink to="/posts" label="Posts" />
          <NavLink to="/users" label="Users" />
          <NavLink to="/route-a" label="Pathless Layout" />
          <NavLink to="/deferred" label="Deferred" />
          <NavLink to="/this-route-does-not-exist" label="Broken Route" />
        </div>
      )}

      <div>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate({ to: '/login' })}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

type NavLinkProps = {
  to: string;
  label: string;
  exact?: boolean;
};

const NavLink = ({ to, label, exact }: NavLinkProps) => (
  <Link
    to={to}
    activeProps={{
      className: 'text-blue-600 font-semibold border-b-2 border-blue-600'
    }}
    activeOptions={exact ? { exact: true } : undefined}
    className="hover:text-blue-500 pb-1"
  >
    {label}
  </Link>
);
