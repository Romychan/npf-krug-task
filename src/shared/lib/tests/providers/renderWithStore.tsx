import { ReactElement, PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { setupStore } from '~/app/store';

interface ExtendedRenderOptions extends RenderOptions {
	/** Object to be used as the initial state for the store */
	preloadedState?: Partial<RootState>;
	/** The AppStore instance to use for the test */
	store?: AppStore;
}

/**
 * Wrapper function with `Provider` for testing components using hooks from `react-redux`
 *
 * @param ui React element that should be wrapped by the `Provider`
 * @param renderOptions Additional options for rendering in test
 *
 * @returns A component wrapped in an redux provider
 */
export const renderWithStore = (ui: ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) => {
	const { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions } = extendedRenderOptions;

	function Wrapper({ children }: PropsWithChildren): JSX.Element {
		return <Provider store={store}>{children}</Provider>;
	}

	return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
