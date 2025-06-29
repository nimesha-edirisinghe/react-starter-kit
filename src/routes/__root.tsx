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
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { I18nProvider } from '~/components/providers/I18nProvider';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...seo({
        title: 'React Starter Kit',
        description: 'React Starter Kit'
      })
    ],
    links: [
      { rel: 'preload', href: appCss, as: 'style' },
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
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <RootLayout>
          <Outlet />
          <Toaster position="top-right" reverseOrder={false} />
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </RootLayout>
      </QueryClientProvider>
    </I18nProvider>
  );
}

function RootLayout({ children }: { children: React.ReactNode }) {
  const matchRoute = useMatchRoute();
  const hideSidebar = matchRoute({ to: '/login', fuzzy: false });

  if (hideSidebar) {
    return (
      <div className="flex min-h-screen flex-col bg-white dark:bg-black text-black dark:text-white">
        <HeadContent />
        <main className="flex-1">{children}</main>
        <TanStackRouterDevtools position="bottom-left" />
        <Scripts />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black text-black dark:text-white">
      <HeadContent />
      <main className="flex-1">{children}</main>
      {/* <TanStackRouterDevtools position="bottom-left" /> */}
      <Scripts />
    </div>
  );
}
