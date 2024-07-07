import { VariantTypes } from '../../../lib/types/ui';
import { TOAST_POSITIONS } from '../constants';

/** The union type with the available toast positions */
export type ToastPositions = (typeof TOAST_POSITIONS)[number];

export interface ToastType {
	/** Unique toast ID */
	id: number;
	/** Main text for the toast */
	title: string;
	/** Additional text for the toast */
	text?: string;
	/** The status type of the component */
	type: 'success' | 'error' | 'warning';
	/**
	 * The variant of the component
	 *
	 * @default 'bordered'
	 */
	variant?: Extract<VariantTypes, 'bordered' | 'filled'>;
	/**
	 * The duration of the toast display in milliseconds.
	 * If the duration is 0 or null, the toast will never be deleted automatically
	 *
	 * @default 2000
	 */
	duration?: number | null;
}

/** The base state interface for the context */
export interface ToastState {
	toasts: ToastType[];
}

/** Interface with properties and methods of working with context */
export interface ToastStoreState extends ToastState {
	addToast: (toast: Omit<ToastType, 'id'>) => void;
	deleteToast: (payload: { id: number }) => void;
}

/** An enum containing the different action types */
export enum ToastActionTypes {
	AddToast = 'ADD_TOAST',
	DeleteToast = 'DELETE_TOAST',
}

/** The type of action to add the toast to the list */
export interface AddToastAction {
	type: ToastActionTypes.AddToast;
	payload: Omit<ToastType, 'id'>;
}

/** The type of action to delete the specified toast */
export interface DeleteToastAction {
	type: ToastActionTypes.DeleteToast;
	payload: {
		id: number;
	};
}

/** List of all toast type actions */
export type ToastActions = AddToastAction | DeleteToastAction;
