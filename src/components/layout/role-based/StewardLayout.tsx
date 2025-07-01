import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import { AppSidebar } from '../sidebar/AppSidebar';
import { CountrySelector } from '~/components/common/CountrySelector';

export function StewardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background border-b">
          <div className="flex items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
          </div>
          <div className="ml-auto flex items-center gap-4 px-4">
            <CountrySelector variant="compact" />
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
              STEWARD
            </span>
          </div>
        </header>
        <main className="flex flex-col w-full p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
