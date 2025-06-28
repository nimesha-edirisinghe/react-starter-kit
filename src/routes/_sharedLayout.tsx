import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_sharedLayout')({
  component: LayoutComponent
});

function LayoutComponent() {
  return (
    <div className="h-auto flex flex-col bg-background text-foreground">
      <main className="flex-1 p-6 animate-in fade-in slide-in-from-bottom-2">
        <Outlet />
      </main>
    </div>
  );
}
