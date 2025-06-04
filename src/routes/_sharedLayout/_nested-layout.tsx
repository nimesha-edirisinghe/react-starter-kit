import { Link, Outlet, createFileRoute } from '@tanstack/react-router';
import { LayoutGrid } from 'lucide-react';
import { cn } from '~/utils/utils';

export const Route = createFileRoute('/_sharedLayout/_nested-layout')({
  component: LayoutComponent
});

function LayoutComponent() {
  return (
    <div className="min-h-[70vh] p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 bg-background rounded-lg shadow-sm border">
      {/* Header */}
      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
        <LayoutGrid className="h-5 w-5" />
        <span>Nested Layout</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex gap-4 border-b pb-3">
        <StyledNavLink to="/route-a">Route A</StyledNavLink>
        <StyledNavLink to="/route-b">Route B</StyledNavLink>
      </nav>

      {/* Outlet for nested routes */}
      <div className="pt-4">
        <Outlet />
      </div>
    </div>
  );
}

// 👇 Abstracted Link styling
function StyledNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-muted-foreground hover:text-primary transition-colors"
      activeProps={{
        className: cn('text-primary font-semibold underline underline-offset-4')
      }}
    >
      {children}
    </Link>
  );
}
