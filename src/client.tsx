/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client';
import { StartClient } from '@tanstack/react-start';
import { createRouter } from './lib/tanstack/router';
import { config } from './utils/config';

const ENABLE_MSW = config.enableMSW === 'true' && config.nodeEnv === 'development';

async function enableMockWorker() {
  if (!ENABLE_MSW) return;

  try {
    const { worker } = await import('./mocks/browser');

    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
        options: {
          scope: '/'
        }
      }
    });

    console.log('✅ MSW worker started successfully');

    setInterval(() => {
      navigator.serviceWorker.controller?.postMessage({ type: 'KEEP_ALIVE' });
    }, 60_000);
  } catch (error) {
    console.error('❌ Failed to start MSW worker:', error);
  }
}

const router = createRouter();

enableMockWorker().then(() => {
  hydrateRoot(document, <StartClient router={router} />);
});
