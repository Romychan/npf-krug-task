import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';

import { ToastContext } from '../context/context';
import { MOCK_TOASTS, MOCK_TOASTS_ADDITIONAL } from '../__mocks__';

import { ToastContainer } from './ToastContainer';

const MOCK_TOAST_STORE = {
	toasts: [],
	addToast: vi.fn(),
	deleteToast: vi.fn(),
};

describe('ToastContainer', () => {
	it('should render correctly', () => {
		render(
			<ToastContext.Provider value={MOCK_TOAST_STORE}>
				<ToastContainer toasts={MOCK_TOASTS} />
			</ToastContext.Provider>,
		);
		const toastContainerElement = screen.getByTestId('toast-container');

		expect(toastContainerElement).toBeInTheDocument();
	});

	it('should render correctly with position', () => {
		render(
			<ToastContext.Provider value={MOCK_TOAST_STORE}>
				<ToastContainer toasts={MOCK_TOASTS} position='top-right' />
			</ToastContext.Provider>,
		);
		const toastContainerElement = screen.getByTestId('toast-container');

		expect(toastContainerElement.getAttribute('class')).toMatch('top-right');
		expect(toastContainerElement.getAttribute('class')).not.toMatch('bottom-center');
	});

	it('should not display toast if the array is empty', () => {
		render(
			<ToastContext.Provider value={MOCK_TOAST_STORE}>
				<ToastContainer toasts={[]} />
			</ToastContext.Provider>,
		);
		const toastElements = screen.queryAllByTestId('toast');

		expect(toastElements).toHaveLength(0);
	});

	it('should display the toasts correctly', () => {
		render(
			<ToastContext.Provider value={MOCK_TOAST_STORE}>
				<ToastContainer toasts={MOCK_TOASTS} />
			</ToastContext.Provider>,
		);
		const toastElements = screen.getAllByTestId('toast');

		expect(toastElements).toHaveLength(2);
	});

	it('should display the last 3 toasts', () => {
		render(
			<ToastContext.Provider value={MOCK_TOAST_STORE}>
				<ToastContainer toasts={MOCK_TOASTS_ADDITIONAL} />
			</ToastContext.Provider>,
		);
		const toastElements = screen.getAllByTestId('toast');

		expect(toastElements).toHaveLength(3);
	});

	it('should match snapshot', () => {
		const container = render(
			<ToastContext.Provider value={MOCK_TOAST_STORE}>
				<ToastContainer toasts={MOCK_TOASTS} />
			</ToastContext.Provider>,
		);

		expect(container).toMatchSnapshot();
	});
});
