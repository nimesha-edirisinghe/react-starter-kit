import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import { Separator } from '~/components/ui/separator';
import { AppSidebar } from '../sidebar/AppSidebar';
import { DynamicBreadcrumb } from '../sidebar/DynamicBreadcrumb/DynamicBreadcrumb';
import { LanguageSwitcher } from '~/components/common/language-switcher/LanguageSwitcher';

export function StewardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrumb />
          </div>
          <div className="ml-auto px-4">
            <LanguageSwitcher />
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
