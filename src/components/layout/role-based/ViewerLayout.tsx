import { useAuthStore } from '~/features/auth/store/auth-store';
import { NavUser } from '../sidebar/NavUser';
import { SidebarProvider } from '~/components/ui/sidebar';
import { Logo } from '../sidebar/Logo';
import { CountrySelector } from '~/components/common/CountrySelector';

export function ViewerLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex flex-row justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background border-b">
        <div className="flex items-center gap-2 px-4">
          <Logo />
        </div>
        <div className="flex items-center gap-4 px-4">
          <CountrySelector variant="compact" />
          <SidebarProvider>
            <div className="ml-auto flex items-center gap-2">
              <NavUser user={user} side="bottom" isViewer={true} />
            </div>
          </SidebarProvider>
        </div>
      </header>
      <main className="flex flex-col w-full p-4">{children}</main>
    </>
  );
}
