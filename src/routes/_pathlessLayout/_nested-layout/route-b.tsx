import { createFileRoute } from '@tanstack/react-router';
import { Landmark } from 'lucide-react';

export const Route = createFileRoute('/_pathlessLayout/_nested-layout/route-b')({
  component: LayoutBComponent
});

function LayoutBComponent() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 border rounded-md shadow-sm bg-background">
      <Landmark className="h-10 w-10 text-blue-500" />
      <h2 className="text-xl font-semibold text-foreground">You’ve landed on Route B 🏛️</h2>
      <p className="text-muted-foreground text-sm max-w-md">
        This is another nested route inside the layout. Feel free to explore and style it however
        you like.
      </p>
    </div>
  );
}
