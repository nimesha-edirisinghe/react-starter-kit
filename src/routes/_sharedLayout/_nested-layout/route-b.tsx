import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_sharedLayout/_nested-layout/route-b')({
  component: LayoutBComponent
});

function LayoutBComponent() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 border rounded-md shadow-sm bg-background">
      <h2 className="text-xl font-semibold text-foreground">You’ve landed on Route B</h2>
      <p className="text-muted-foreground text-sm max-w-md">
        This is another nested route inside the layout.
      </p>
    </div>
  );
}
