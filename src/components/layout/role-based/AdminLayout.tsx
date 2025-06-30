import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import { Separator } from '~/components/ui/separator';
import { AppSidebar } from '../sidebar/AppSidebar';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <Separator orientation="vertical" />
          </div>
          <div className="ml-auto px-4">
            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
              ADMIN
            </span>
          </div>
        </header>
        <main className="flex flex-col w-full p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
