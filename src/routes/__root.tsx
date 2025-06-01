import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  useMatchRoute
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import * as React from 'react';
import { DefaultCatchBoundary } from '~/components/feedback/DefaultCatchBoundary';
import { NotFound } from '~/components/feedback/NotFound';
import appCss from '~/styles/app.css?url';
import { seo } from '~/utils/seo';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '~/lib/tanstack/query';
import { NavBar } from '~/components/layout/Navbar/Navbar';
import { useThemeStore } from '~/stores/themeStore';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...seo({
        title: 'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: 'TanStack Start is a type-safe, client-first, full-stack React framework.'
      })
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest', color: '#ffffff' },
      { rel: 'icon', href: '/favicon.ico' }
    ]
  }),
  errorComponent: (props) => (
    <RootLayout>
      <DefaultCatchBoundary {...props} />
    </RootLayout>
  ),
  notFoundComponent: () => <NotFound />,
  component: RootComponent
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </RootLayout>
    </QueryClientProvider>
  );
}

function RootLayout({ children }: { children: React.ReactNode }) {
  const matchRoute = useMatchRoute();
  const hideNavBar = matchRoute({ to: '/login', fuzzy: false });

  React.useEffect(() => {
    const theme = useThemeStore.getState().theme;
    const root = document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.classList.toggle('dark', isDark);
  }, []);

  return (
    <div className="app-container flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <HeadContent />
      {!hideNavBar && <NavBar />}
      <main className="">{children}</main>
      <TanStackRouterDevtools position="bottom-left" />
      <Scripts />
    </div>
  );
}
