import { userHandlers } from '~/entities/User';

/**
 * A function to start the MSW worker to intercept requests
 *
 * @returns Promise with worker
 */
export const startWorker = async () => {
	const { worker } = await import('~/shared/lib/server/browser');
	worker.use(...userHandlers);

	return worker.start({ onUnhandledRequest: 'bypass' });
};
