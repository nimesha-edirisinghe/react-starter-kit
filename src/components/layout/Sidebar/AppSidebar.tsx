import * as React from 'react';
import { Radio, Activity, LayoutDashboard } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '~/components/ui/sidebar';
import { NavMain } from './NavMain';
import { NavUser } from './NavUser';
import { useAuthStore } from '~/features/auth/store/auth-store';
import { UserRole } from '~/features/auth/types/auth';
import { LogoSection } from './LogoSection';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();

  const data = {
    navMain: [
      {
        title: 'Dashboard',
        url: '/',
        icon: LayoutDashboard,
        isActive: true,
        allowedRoles: ['admin', 'steward'] as UserRole[]
      },
      {
        title: 'Incidents',
        url: '/incidents',
        icon: Activity,
        allowedRoles: ['admin', 'steward'] as UserRole[]
      },
      {
        title: 'Live',
        url: '/live',
        icon: Radio,
        allowedRoles: ['admin', 'steward', 'viewer'] as UserRole[]
      }
    ]
  };

  const filteredNavItems = data.navMain.filter((item) => {
    if (!user) return false;
    return item.allowedRoles.includes(user.role);
  });

  const userData = user && {
    name: user.name,
    email: user.email
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoSection />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
