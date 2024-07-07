import { Decorator } from '@storybook/react';
import { Provider } from 'react-redux';

import { ToastProvider } from '../../../ui/Toast';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { setupStore } from '~/app/store';

/**
 * Wrapper decorator with the main application providers for components.
 * The mock store is set by `parameters.preloadState`. If no preloadState is specified, `{}` is used by default
 */
export const withAppProvidersDecorator: Decorator = (Story, { parameters }) => {
	const preloadedState = parameters.preloadState ?? {};
	const mockStore = setupStore(preloadedState);

	return (
		<Provider store={mockStore}>
			<ToastProvider>
				<Story />
			</ToastProvider>
		</Provider>
	);
};
