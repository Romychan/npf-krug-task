import { fireEvent, screen, render } from '@testing-library/react';
import { vi } from 'vitest';

import { ToastContext } from '../context/context';

import { Toast } from './Toast';

const MOCK_TOAST_STORE = {
	toasts: [],
	addToast: vi.fn(),
	deleteToast: vi.fn(),
};

describe('Toast', () => {
	beforeEach(() => {
		vi.useFakeTimers({ shouldAdvanceTime: true });
	});

	afterEach(() => {
		vi.clearAllTimers();
	});

	it('should render correctly', () => {
		render(
			<ToastContext.Provider value={MOCK_TOAST_STORE}>
				<Toast id={1} title='Test' type='success' />
			</ToastContext.Provider>,
		);
		const toastElement = screen.getByTestId('toast');

		expect(toastElement).toBeInTheDocument();
		expect(toastElement).toHaveTextContent(/Test/gi);
	});

	it('should render correctly with type', () => {
		render(
			<ToastContext.Provider value={MOCK_TOAST_STORE}>
				<Toast id={1} title='Test' type='error' />
			</ToastContext.Provider>,
		);

		const toastElement = screen.getByTestId('toast');

		expect(toastElement.getAttribute('class')).toMatch('error');
		expect(toastElement.getAttribute('class')).not.toMatch('success');
	});

	it('should render correctly with variant', () => {
		render(
			<ToastContext.Provider value={MOCK_TOAST_STORE}>
				<Toast id={1} title='Test' type='success' variant='filled' />
			</ToastContext.Provider>,
		);

		const toastElement = screen.getByTestId('toast');

		expect(toastElement.getAttribute('class')).toMatch('filled');
		expect(toastElement.getAttribute('class')).not.toMatch('bordered');
	});

	it('should close after clicking the close button', async () => {
		const mockStoreSpy = vi.spyOn(MOCK_TOAST_STORE, 'deleteToast');

		render(
			<ToastContext.Provider value={MOCK_TOAST_STORE}>
				<Toast id={1} title='Test' type='success' variant='filled' />
			</ToastContext.Provider>,
		);

		const toastElement = screen.getByTestId('toast');
		const toastCloseElement = screen.getByTestId('toast-close');

		fireEvent.click(toastCloseElement);
		fireEvent.transitionEnd(toastElement);

		expect(mockStoreSpy).toHaveBeenCalledTimes(1);
	});

	it('should stop timer after onMouseEnter and start after onMouseLeave', () => {
		vi.spyOn(global, 'setTimeout');
		vi.spyOn(global, 'clearTimeout');

		render(
			<ToastContext.Provider value={MOCK_TOAST_STORE}>
				<Toast id={1} title='Test' type='success' variant='filled' duration={3000} />
			</ToastContext.Provider>,
		);

		const toastElement = screen.getByTestId('toast');

		expect(setTimeout).toHaveBeenCalledTimes(1);

		fireEvent.mouseEnter(toastElement);

		expect(clearTimeout).toHaveBeenCalled();
		expect(setTimeout).toHaveBeenCalledTimes(1);

		fireEvent.mouseLeave(toastElement);

		expect(setTimeout).toHaveBeenCalledTimes(2);
	});

	it('should match snapshot', () => {
		const container = render(
			<ToastContext.Provider value={MOCK_TOAST_STORE}>
				<Toast id={1} title='Test' type='success' variant='filled' duration={null} />
			</ToastContext.Provider>,
		);

		expect(container).toMatchSnapshot();
	});
});
