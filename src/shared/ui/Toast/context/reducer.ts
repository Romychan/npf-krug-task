import { ToastActionTypes, ToastActions, ToastState } from '../types';

/**
 * A function for controlling the state of the toast context
 *
 * @param state State for the context
 * @param action Type of action
 *
 * @returns Updated state
 */
export const toastReducer = (state: ToastState, action: ToastActions): ToastState => {
	switch (action.type) {
		case ToastActionTypes.AddToast:
			return {
				...state,
				toasts: [...state.toasts, { ...action.payload, id: Math.floor(Math.random() * 1000) }],
			};

		case ToastActionTypes.DeleteToast:
			return {
				...state,
				toasts: state.toasts.filter((toast) => toast.id !== action.payload.id),
			};

		default:
			return state;
	}
};
