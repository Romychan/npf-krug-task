import { Decorator } from '@storybook/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { setupStore } from '~/app/store';

/**
 * Wrapper decorator that wraps the story to the redux provider.
 * The mock store is set by `parameters.preloadState`. If no preloadState is specified, `{}` is used by default
 */
export const withStoreDecorator: Decorator = (Story, { parameters }) => {
	const preloadedState = parameters.preloadState ?? {};
	const mockStore = setupStore(preloadedState);

	return (
		<Provider store={mockStore}>
			<Story />
		</Provider>
	);
};
