import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from '../../routeTree.gen';
import { DefaultCatchBoundary } from '../../components/feedback/DefaultCatchBoundary';
import { NotFound } from '../../components/feedback/NotFound';

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
    notFoundMode: 'root' // Handle 404s at root level for better UX
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
