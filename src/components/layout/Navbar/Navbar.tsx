import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '~/features/auth/store/auth-store';

import { NavLogo } from './NavLogo';
import { NavLinks } from './NavLinks';
import { NavToggle } from './NavToggle';
import { NavAuthButton } from './NavAuthButton';
import { MobileNavMenu } from './MobileNavMenu';
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
      <nav className="sticky top-0 z-50 px-6 py-4 bg-[#fdf6f9]/60 backdrop-blur-md border-b border-rose-100 shadow-sm select-none">
        <div className=" mx-auto flex items-center gap-4">
          <NavLogo />

          <div className="hidden md:flex items-center gap-4 flex-1">
            {isAuthenticated && <NavLinks />}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {isAuthenticated && <NavToggle onClick={() => setMenuOpen((prev) => !prev)} />}
            <NavAuthButton isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {isAuthenticated && <MobileNavMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}
    </>
  );
};
