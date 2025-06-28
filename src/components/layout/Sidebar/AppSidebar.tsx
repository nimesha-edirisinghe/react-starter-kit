'use client';

import * as React from 'react';
import { Bot, GalleryVerticalEnd, Settings2, SquareTerminal } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '~/components/ui/sidebar';
import { TeamSwitcher } from './TeamSwitcher';
import { NavMain } from './NavMain';
import { NavUser } from './NavUser';
import { useAuthStore } from '~/features/auth/store/auth-store';
import { UserRole } from '~/features/auth/types/auth';

const data = {
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise'
    }
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: SquareTerminal,
      isActive: true,
      allowedRoles: ['admin', 'steward'] as UserRole[]
    },
    {
      title: 'Incidents',
      url: '/incidents',
      icon: Bot,
      allowedRoles: ['admin', 'steward'] as UserRole[]
    },
    {
      title: 'Live',
      url: '/live',
      icon: Settings2,
      allowedRoles: ['viewer'] as UserRole[]
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();

  const filteredNavItems = data.navMain.filter((item) => {
    if (!user) return false;
    return item.allowedRoles.includes(user.role);
  });

  const userData = user
    ? {
        name: user.name,
        email: user.email,
        avatar: '/avatars/shadcn.jpg'
      }
    : {
        name: 'Guest',
        email: 'guest@example.com',
        avatar: '/avatars/shadcn.jpg'
      };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
