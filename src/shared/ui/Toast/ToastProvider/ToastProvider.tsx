import { PropsWithChildren, useReducer } from 'react';

import { ToastContainer } from '../ToastContainer';
import { ToastContext } from '../context/context';
import { toastReducer } from '../context/reducer';
import { ToastType, ToastState, ToastActionTypes, ToastPositions } from '../types';

const initialState = {
	toasts: [],
};

interface IToastContextProviderProps {
	/** Initial value for the context */
	preloadState?: ToastState;
	/**
	 * The position on the page where the notifications will be placed
	 *
	 * @default 'top-right'
	 */
	position?: ToastPositions;
}

export const ToastProvider = ({
	preloadState = initialState,
	position = 'top-right',
	children,
}: PropsWithChildren<IToastContextProviderProps>) => {
	const [state, dispatch] = useReducer(toastReducer, preloadState);

	const addToast = (payload: Omit<ToastType, 'id'>) => {
		dispatch({ type: ToastActionTypes.AddToast, payload });
	};

	const deleteToast = (payload: { id: number }) => {
		dispatch({ type: ToastActionTypes.DeleteToast, payload });
	};

	return (
		<ToastContext.Provider value={{ ...state, addToast, deleteToast }}>
			{children}
			<ToastContainer toasts={state.toasts} position={position} />
		</ToastContext.Provider>
	);
};
