/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client';
import { StartClient } from '@tanstack/react-start';
import { createRouter } from './lib/tanstack/router';
import { config } from './lib/utils/config';

const ENABLE_MSW = config.enableMSW === 'true' && config.nodeEnv === 'development';

async function enableMockWorker() {
  if (ENABLE_MSW) {
    const { worker } = await import('./mocks/browser');
    await worker.start();
  }
}

const router = createRouter();

enableMockWorker().then(() => {
  hydrateRoot(document, <StartClient router={router} />);
});
