import { Outlet, createFileRoute } from '@tanstack/react-router';
import { AuthGuard } from '~/features/auth/components/AuthGuard';
import { requireAuth } from '~/features/auth/guards/require-auth';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import { AppSidebar } from '~/components/layout/Sidebar/AppSidebar';
import { Separator } from '~/components/ui/separator';
import { DynamicBreadcrumb } from '~/components/layout/Sidebar/DynamicBreadcrumb/DynamicBreadcrumb';

export const Route = createFileRoute('/_protected')({
  beforeLoad: requireAuth,
  component: ProtectedLayoutComponent
});

function ProtectedLayoutComponent() {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <DynamicBreadcrumb />
            </div>
          </header>
          <main className="flex flex-col w-full p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
