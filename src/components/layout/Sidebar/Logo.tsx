'use client';

import { Link } from '@tanstack/react-router';
import logoImage from '~/assets/images/logo.png';

export const Logo = () => {
  return (
    <>
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
        <div className="bg-none">
          <Link to="/">
            <img src={logoImage} alt="Boomerang Logo" className="h-8 w-8 object-contain" />
          </Link>
        </div>
      </div>
      <div className="grid flex-1 text-left text-lg leading-tight">
        <span className="truncate font-bold text-[#FF5630]">Formula Fire</span>
      </div>
    </>
  );
};
