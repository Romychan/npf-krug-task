import { ReactElement, PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import { ToastProvider } from '../../../ui/Toast';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { setupStore } from '~/app/store';

interface ExtendedRenderOptions extends RenderOptions {
	/** Object to be used as the initial state for the store */
	preloadedState?: Partial<RootState>;
	/** The AppStore instance to use for the test */
	store?: AppStore;
}

/**
 * Renders a React component with the main application providers for testing component
 *
 * @param ui React element that should be wrapped main application providers
 * @param renderOptions Additional options for rendering in test
 *
 * @returns A component wrapped in an main application providers
 */
export const renderWithAppProviders = (
	ui: ReactElement,
	{ preloadedState = {}, store = setupStore(preloadedState), ...renderOptions }: ExtendedRenderOptions = {},
) => {
	const Wrappers = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
		return (
			<ToastProvider>
				<Provider store={store}>{children}</Provider>
			</ToastProvider>
		);
	};

	return { store, ...render(ui, { wrapper: Wrappers, ...renderOptions }) };
};
