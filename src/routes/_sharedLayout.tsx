import { Outlet, createFileRoute } from '@tanstack/react-router';
import { Home, LayoutPanelTop } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_sharedLayout')({
  component: LayoutComponent
});

function LayoutComponent() {
  return (
    <div className="h-auto flex flex-col bg-background text-foreground">
      <header className="border-b px-6 py-4 shadow-sm bg-white dark:bg-gray-950 flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <LayoutPanelTop className="h-5 w-5 text-primary" />
          <span>My App Layout</span>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to="/">
            <Home className="h-4 w-4 mr-1" /> Home
          </Link>
        </Button>
      </header>
      <main className="flex-1 p-6 animate-in fade-in slide-in-from-bottom-2">
        <Outlet />
      </main>
    </div>
  );
}
