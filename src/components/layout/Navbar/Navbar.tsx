import { Link, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useAuthStore } from '~/features/auth/store';
import { Button } from '~/components/ui/button';

export const NavBar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  return (
    <nav className="sticky top-0 z-50 px-6 py-4 bg-[#fdf6f9]/60 backdrop-blur-md border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent hover:from-purple-400 hover:to-pink-400 transition-all duration-300"
          >
            React Kit
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex items-center gap-2"
          >
            <NavLink to="/" label="Home" exact />
            <NavLink to="/posts" label="Posts" />
            <NavLink to="/users" label="Users" />
            <NavLink to="/route-a" label="Pathless Layout" />
            <NavLink to="/deferred" label="Deferred" />
            <NavLink to="/this-route-does-not-exist" label="Broken Route" />
          </motion.div>
        )}

        {/* Mobile Toggle */}
        {isAuthenticated && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="md:hidden p-2 rounded-lg bg-white/30 hover:bg-white/50 transition-colors"
            onClick={() => console.log('Toggle mobile menu')}
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1">
              <div className="w-full h-0.5 bg-slate-700 rounded"></div>
              <div className="w-full h-0.5 bg-slate-700 rounded"></div>
              <div className="w-full h-0.5 bg-slate-700 rounded"></div>
            </div>
          </motion.button>
        )}

        {/* Auth Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {isAuthenticated ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-slate-400 transition-all duration-300"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate({ to: '/login' })}
              className="bg-gradient-to-r from-fuchsia-500 to-yellow-400 hover:from-pink-500 hover:to-yellow-300 text-white shadow-md transition-all duration-300"
            >
              Login
            </Button>
          )}
        </motion.div>
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
      className: 'text-pink-600 font-semibold underline underline-offset-4'
    }}
    activeOptions={exact ? { exact: true } : undefined}
    className="px-3 py-2 text-slate-700 hover:text-pink-500 transition-colors"
  >
    {label}
  </Link>
);
