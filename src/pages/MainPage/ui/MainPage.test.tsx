import { screen, fireEvent, RenderResult, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import { userHandlers } from '~/entities/User';

import { renderWithAppProviders } from '~/shared/lib/tests';
import { server } from '~/shared/lib/server/server';

import { MainPage } from './MainPage';

describe('MainPage', () => {
	describe('Default render', () => {
		let container: RenderResult;

		beforeEach(() => {
			server.use(...userHandlers);

			container = renderWithAppProviders(<MainPage />);
		});

		it('should render correctly', async () => {
			const addUserElement = screen.getByTestId('drawer-add-user');
			const userRowElement = await screen.findAllByTestId('table-body-row');

			expect(addUserElement).toBeInTheDocument();
			expect(userRowElement).toHaveLength(10);
		});

		it('should match snapshot', async () => {
			await waitForElementToBeRemoved(screen.getByTestId('loader'));
			expect(container).toMatchSnapshot();
		});
	});

	describe('Delete user', () => {
		let container: RenderResult;

		beforeEach(() => {
			server.use(...userHandlers);

			container = renderWithAppProviders(<MainPage />);
		});

		it('should delete user correctly', async () => {
			const userRowElement = await screen.findByText(/Test Name/i);

			expect(userRowElement).toBeInTheDocument();

			const userDeleteElement = await screen.findAllByTestId('delete-user');

			fireEvent.click(userDeleteElement[0]);

			await waitFor(() => expect(userRowElement).not.toBeInTheDocument());
		});

		it('should add a user correctly after deleting all users', async () => {
			const loadMoreUser = await screen.findByTestId('load-more-users');
			fireEvent.click(loadMoreUser);

			await waitFor(() => expect(screen.getAllByTestId('delete-user')).toHaveLength(15));

			screen.getAllByTestId('delete-user').forEach((button) => fireEvent.click(button));

			expect(await screen.findByTestId('table-body-empty')).toBeInTheDocument();

			const buttonElement = screen.getByTestId('drawer-add-user');
			fireEvent.click(buttonElement);
			fillFormInputs();

			fireEvent.submit(screen.getByTestId('add-user'));

			const userRowElement = await screen.findAllByTestId('table-body-row');

			expect(userRowElement).toHaveLength(1);
		});

		it('should match snapshot', async () => {
			await waitForElementToBeRemoved(screen.getByTestId('loader'));
			expect(container).toMatchSnapshot();
		});
	});

	describe('Add user', () => {
		let container: RenderResult;

		beforeEach(() => {
			server.use(...userHandlers);

			container = renderWithAppProviders(<MainPage />);
		});

		it('should add user correctly', async () => {
			const buttonElement = screen.getByTestId('drawer-add-user');

			fireEvent.click(buttonElement);

			fillFormInputs();

			fireEvent.submit(screen.getByTestId('add-user'));

			await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));
		});

		it('should match snapshot', async () => {
			expect(container).toMatchSnapshot();
		});
	});
});

const fillFormInputs = () => {
	fireEvent.change(screen.getByRole('textbox', { name: /^name/i }), {
		target: { value: 'Name' },
	});
	fireEvent.change(screen.getByRole('textbox', { name: /username/i }), {
		target: { value: 'Username' },
	});
	fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
		target: { value: 'test@test.test' },
	});
};
