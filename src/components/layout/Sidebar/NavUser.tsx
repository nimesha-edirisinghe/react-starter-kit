import { ChevronsUpDown, LogOut } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '~/features/auth/store/auth-store';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '~/components/ui/sidebar';
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';

interface NavUserProps {
  user: {
    name: string;
    email: string;
  };
  side?: DropdownMenuContentProps['side'];
  isViewer?: boolean;
}

export function NavUser({ user, side, isViewer = false }: NavUserProps) {
  const { isMobile } = useSidebar();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  const avatarFallbackName = user.name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase();

  const UserAvatar = (
    <Avatar className="h-8 w-8 rounded-lg">
      <AvatarImage src="" alt={user.name} />
      <AvatarFallback className="rounded-lg">{avatarFallbackName}</AvatarFallback>
    </Avatar>
  );

  const UserDropdownContent = (
    <DropdownMenuContent
      className="min-w-56 rounded-lg"
      side={side ?? (isMobile ? 'bottom' : 'right')}
      align="end"
      sideOffset={4}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          {UserAvatar}
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isViewer ? (
              <div className="cursor-pointer">{UserAvatar}</div>
            ) : (
              <SidebarMenuButton
                size="lg"
                className="focus:outline-none select-none cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {UserAvatar}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            )}
          </DropdownMenuTrigger>
          {UserDropdownContent}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
