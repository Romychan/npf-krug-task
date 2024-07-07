import { useContext } from 'react';

import { ToastContext } from '../context/context';

/**
 * A hook to get the toast context
 *
 * @returns Properties and methods of working with toast context
 */
export const useToast = () => {
	const context = useContext(ToastContext);

	if (context === null) {
		throw new Error('useToast must be used within a ToastProvider');
	}

	return context;
};
