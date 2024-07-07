import { createPortal } from 'react-dom';

import { cl } from '../../../lib/utils';
import { Toast } from '../Toast';
import { ToastPositions, ToastType } from '../types';

import styles from './ToastContainer.module.scss';

interface IToastContainerProps {
	/** List of toasts to display */
	toasts: ToastType[];
	/**
	 * The position on the page where the toasts will be placed
	 *
	 * @default 'bottom-center'
	 */
	position?: ToastPositions;
}

/** This component is used to display the list of `<Toast />` using the portal */
export const ToastContainer = ({ toasts = [], position = 'top-right' }: IToastContainerProps) => {
	return createPortal(
		<div className={cl(styles.container, styles[position])} data-testid='toast-container'>
			{toasts.slice(0, 3).map((toast) => (
				<Toast key={toast.id} {...toast} />
			))}
		</div>,
		document.body,
	);
};
