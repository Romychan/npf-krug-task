import { setupWorker } from 'msw/browser';

/** Set up requests interception worker in the browser */
export const worker = setupWorker();
