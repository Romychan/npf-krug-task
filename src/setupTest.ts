import { cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/vitest';

import { server } from './shared/lib/server/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterEach(() => {
	cleanup();
	server.resetHandlers();
});

afterAll(() => server.close());
