import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '../store';

/** This is a component that provides the store context to its child components */
export const RootStoreProvider = ({ children }: PropsWithChildren) => {
	return <Provider store={store}>{children}</Provider>;
};
