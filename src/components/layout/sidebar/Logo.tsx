import { Link } from '@tanstack/react-router';
import logoImage from '~/assets/images/logo.png';

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
        <div className="bg-none">
          <img src={logoImage} alt="Boomerang Logo" className="h-8 w-8 object-contain" />
        </div>
      </div>
      <div className="grid flex-1 text-left text-lg leading-tight">
        <span className="truncate font-bold text-primary">Formula Zone</span>
      </div>
    </Link>
  );
};
