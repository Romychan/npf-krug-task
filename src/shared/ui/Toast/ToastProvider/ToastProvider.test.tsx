import { screen, render } from '@testing-library/react';

import { MOCK_TOASTS } from '../__mocks__';

import { ToastProvider } from './ToastProvider';

describe('ToastProvider', () => {
	it('should render correctly', () => {
		render(<ToastProvider />);
		const toastContainerElement = screen.getByTestId('toast-container');

		expect(toastContainerElement).toBeInTheDocument();
	});

	it('should not display toast if the array is empty', () => {
		render(<ToastProvider preloadState={{ toasts: [] }} />);
		const toastElements = screen.queryAllByTestId('toast');

		expect(toastElements).toHaveLength(0);
	});

	it('should display the toasts correctly', () => {
		render(<ToastProvider preloadState={{ toasts: MOCK_TOASTS }} />);
		const toastElements = screen.getAllByTestId('toast');

		expect(toastElements).toHaveLength(2);
	});

	it('should match snapshot', () => {
		const container = render(<ToastProvider preloadState={{ toasts: MOCK_TOASTS }} />);

		expect(container).toMatchSnapshot();
	});
});
