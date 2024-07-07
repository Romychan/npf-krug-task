import { ToastType } from '../types';

export const MOCK_TOASTS = [
	{
		id: 1,
		title: 'Toast',
		type: 'success',
	},
	{
		id: 2,
		title: 'Toast',
		type: 'error',
	},
] as ToastType[];

export const MOCK_TOASTS_ADDITIONAL = [
	{
		id: 3,
		title: 'Toast',
		type: 'warning',
	},
	{
		id: 4,
		title: 'Toast',
		type: 'success',
	},
	{
		id: 5,
		title: 'Toast',
		type: 'warning',
	},
	...MOCK_TOASTS,
] as ToastType[];
