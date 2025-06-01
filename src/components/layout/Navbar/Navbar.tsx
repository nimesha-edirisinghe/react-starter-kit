import { useAuthStore } from '~/features/auth/store';
import { useNavigate } from '@tanstack/react-router';
import { NavLogo } from './NavLogo';
import { NavLinks } from './NavLinks';
import { NavToggle } from './NavToggle';
import { NavAuthButton } from './NavAuthButton';
import { MobileNavMenu } from './MobileNavMenu';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

export const NavBar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  return (
    <>
      <nav className="sticky top-0 z-50 px-6 py-4 bg-[#fdf6f9]/60 backdrop-blur-md border-b border-rose-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <NavLogo />
          {isAuthenticated && <NavLinks />}
          {isAuthenticated && <NavToggle onClick={() => setMenuOpen(!menuOpen)} />}
          <NavAuthButton isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <ThemeToggle />
        </div>
      </nav>
      {isAuthenticated && <MobileNavMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}
    </>
  );
};
