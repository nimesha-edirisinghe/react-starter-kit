import { createFileRoute } from '@tanstack/react-router';
import { Sparkles } from 'lucide-react';

export const Route = createFileRoute('/_sharedLayout/_nested-layout/route-a')({
  component: LayoutAComponent
});

function LayoutAComponent() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 border rounded-md shadow-sm bg-white dark:bg-gray-950">
      <Sparkles className="h-10 w-10 text-primary" />
      <h2 className="text-xl font-semibold text-foreground">Welcome to Route A </h2>
      <p className="text-muted-foreground text-sm max-w-md">
        This is nested route with enhanced UI. Use the top navigation to switch between routes.
      </p>
    </div>
  );
}
