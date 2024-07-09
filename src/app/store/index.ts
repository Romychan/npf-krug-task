import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { userReducer } from '~/entities/User';
import { usersSagaWatcher } from '~/entities/User';

const rootReducer = combineReducers({
	users: userReducer,
});

/** The root saga that starts all other sagas in the application */
function* rootSaga() {
	yield all([fork(usersSagaWatcher)]);
}

/**
 * Sets up the Redux store with the root reducer and the root saga
 *
 * @param preloadState  The initial state for the store
 * @returns An object containing the store and a function to run the root saga
 *
 */
export const setupStore = (preloadedState = {}) => {
	const sagaMiddleware = createSagaMiddleware();

	return {
		...configureStore({
			reducer: rootReducer,
			preloadedState,
			middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
		}),
		runSaga: sagaMiddleware.run(rootSaga),
	};
};

export const store = setupStore();

/** The type of the root state of the Redux store. This type is inferred from the root reducer. */
export type RootState = ReturnType<typeof rootReducer>;
/** The type of the Redux store */
export type AppStore = ReturnType<typeof setupStore>;
/** The type of the dispatch function of the Redux store */
export type AppDispatch = AppStore['dispatch'];
