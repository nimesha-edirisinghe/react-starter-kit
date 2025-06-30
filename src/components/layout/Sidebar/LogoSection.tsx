'use client';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar';
import { Logo } from './Logo';

export const LogoSection = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent hover:text-current disabled:opacity-100"
          disabled
        >
          <Logo />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
