import { setupServer } from 'msw/node';

/** Set up requests interception worker in the server */
export const server = setupServer();
