import { fireEvent, screen, render } from '@testing-library/react';
import { vi } from 'vitest';

import { Drawer } from './Drawer';

describe('Drawer', () => {
	it('should render correctly', () => {
		const handleClose = vi.fn();
		render(
			<Drawer title='Title' description='Description' onClose={handleClose} isVisible>
				Content
			</Drawer>,
		);

		const headerElement = screen.getByText(/Title/i);
		const bodyElement = screen.getByText(/Content/i);

		expect(headerElement).toBeInTheDocument();
		expect(bodyElement).toBeInTheDocument();
	});

	it('should onClose work correctly in children component', () => {
		const handleClose = vi.fn();
		render(
			<Drawer title='Title' description='Description' onClose={handleClose} isVisible>
				{(ocClose) => <button onClick={ocClose}>Close</button>}
			</Drawer>,
		);

		const closeButtonElement = screen.getByRole('button', { name: 'Close' });
		const backdropElement = screen.getByTestId('drawer-backdrop');

		fireEvent.click(closeButtonElement);
		fireEvent.animationEnd(backdropElement);

		expect(handleClose).toHaveBeenCalled();
	});

	it('should close after clicking the close button', () => {
		const handleClose = vi.fn();
		render(
			<Drawer title='Title' description='Description' onClose={handleClose} isVisible>
				Content
			</Drawer>,
		);

		const closeButtonElement = screen.getByTestId('drawer-close');
		const backdropElement = screen.getByTestId('drawer-backdrop');

		fireEvent.click(closeButtonElement);
		fireEvent.animationEnd(backdropElement);

		expect(handleClose).toHaveBeenCalled();
	});

	it('should close after pressing Escape', () => {
		const handleClose = vi.fn();
		render(
			<Drawer title='Title' description='Description' onClose={handleClose} isVisible>
				Content
			</Drawer>,
		);

		const drawerElement = screen.getByTestId('drawer');
		const backdropElement = screen.getByTestId('drawer-backdrop');

		fireEvent.keyDown(drawerElement, {
			key: 'Escape',
			code: 'Escape',
			keyCode: 27,
			charCode: 27,
		});
		fireEvent.animationEnd(backdropElement);

		expect(handleClose).toHaveBeenCalled();
	});

	it('should closed by clicking on the backdrop', () => {
		const handleClose = vi.fn();
		render(
			<Drawer title='Title' description='Description' onClose={handleClose} isVisible>
				Content
			</Drawer>,
		);

		const backdropElement = screen.getByTestId('drawer-backdrop');

		fireEvent.click(backdropElement);
		fireEvent.animationEnd(backdropElement);

		expect(handleClose).toHaveBeenCalled();
	});

	it('should ignore the click on the backdrop with closeOnBackdropClick', () => {
		const handleClose = vi.fn();
		render(
			<Drawer title='Title' description='Description' onClose={handleClose} isVisible closeOnBackdropClick={false}>
				Content
			</Drawer>,
		);

		const backdropElement = screen.getByTestId('drawer-backdrop');
		fireEvent.click(backdropElement);

		expect(handleClose).not.toHaveBeenCalled();
	});

	it('should match snapshot', () => {
		const handleClose = vi.fn();
		const container = render(
			<Drawer title='Title' description='Description' onClose={handleClose} isVisible>
				Content
			</Drawer>,
		);

		expect(container).toMatchSnapshot();
	});
});
