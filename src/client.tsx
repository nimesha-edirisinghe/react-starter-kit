/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client';
import { StartClient } from '@tanstack/react-start';
import { createRouter } from './lib/tanstack/router';

async function enableMockWorker() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser');
    await worker.start();
  }
}

const router = createRouter();

enableMockWorker().then(() => {
  hydrateRoot(document, <StartClient router={router} />);
});
