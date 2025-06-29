'use client';

import { Link } from '@tanstack/react-router';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar';
import logoImage from '~/assets/images/logo.png';

export const LogoSection = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent hover:text-current disabled:opacity-100"
          disabled
        >
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
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
