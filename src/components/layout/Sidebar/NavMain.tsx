'use client';

import { Link, useRouterState } from '@tanstack/react-router';
import { type LucideIcon } from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '~/components/ui/sidebar';
import { cn } from '~/utils/utils';

export function NavMain({
  items
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const currentPath = useRouterState({
    select: (state) => state.location.pathname
  });

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            currentPath === item.url || (item.url !== '/' && currentPath.startsWith(item.url));

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                data-active={isActive}
                className="data-[active=true]:bg-white data-[active=true]:text-primary data-[active=true]:font-medium hover:!bg-custom-orange-foreground hover:!text-primary"
              >
                <Link
                  to={item.url}
                  className={cn(
                    'flex items-center gap-2 w-full transition-all duration-200 ease-in-out',
                    isActive && 'text-primary !bg-[#FFF1EA] hover:text-primary hover:bg-[#FFF1EA]'
                  )}
                >
                  {item.icon && <item.icon style={{ height: '16px', width: '16px' }} />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
