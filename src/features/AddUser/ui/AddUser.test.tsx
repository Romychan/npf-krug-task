import { fireEvent, screen, RenderResult } from '@testing-library/react';

import { renderWithStore } from '~/shared/lib/tests';

import { AddUser } from './AddUser';

describe('AddUser', () => {
	let container: RenderResult;

	beforeEach(() => {
		container = renderWithStore(<AddUser />);
	});

	it('should render correctly', () => {
		expect(screen.getByTestId('drawer-add-user')).toBeInTheDocument();
		expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
	});

	it('should open the drawer with the form correctly', () => {
		const buttonElement = screen.getByTestId('drawer-add-user');

		fireEvent.click(buttonElement);

		const drawerElement = screen.getByTestId('drawer');

		expect(drawerElement).toBeInTheDocument();
	});

	it('should close the drawer with the form correctly', () => {
		const buttonElement = screen.getByTestId('drawer-add-user');

		fireEvent.click(buttonElement);

		const drawerElement = screen.getByTestId('drawer');
		const cancelButtonElement = screen.getByTestId('cancel-add-user');
		const drawerBackdropElement = screen.getByTestId('drawer-backdrop');

		expect(drawerElement).toBeInTheDocument();

		fireEvent.click(cancelButtonElement);
		fireEvent.animationEnd(drawerBackdropElement);

		expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
	});

	it('should match snapshot', () => {
		expect(container).toMatchSnapshot();
	});
});
