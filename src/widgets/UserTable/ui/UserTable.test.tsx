import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import { userHandlers } from '~/entities/User';

import { server } from '~/shared/lib/server/server';
import { renderWithStore } from '~/shared/lib/tests';

import { UserTable } from './UserTable';

describe('UserTable', () => {
	beforeEach(() => {
		window.history.replaceState({}, '', '/');
		server.use(...userHandlers);
	});

	it('should render correctly', () => {
		renderWithStore(<UserTable />);

		const tableElement = screen.getByTestId('user-table');

		expect(tableElement).toBeInTheDocument();
	});

	it('should be loader displayed if data is loading', () => {
		window.history.replaceState({}, '', '/?loading=true');
		renderWithStore(<UserTable />);

		const userRowElement = screen.queryAllByTestId('table-body-row');
		const loaderElement = screen.getByTestId('loader');

		expect(userRowElement).toHaveLength(0);
		expect(loaderElement).toBeInTheDocument();
	});

	it('should load and display data correctly', async () => {
		renderWithStore(<UserTable />);

		const userRowElement = await screen.findAllByTestId('table-body-row');

		expect(screen.getByText(/Test Name/i)).toBeInTheDocument();

		expect(userRowElement).toHaveLength(10);
	});

	it('should be empty element displayed if data is empty', async () => {
		window.history.replaceState({}, '', '/?empty=true');
		renderWithStore(<UserTable />);

		const userRowElement = screen.queryAllByTestId('table-body-row');
		const emptyElement = await screen.findByTestId('table-body-empty');

		expect(userRowElement).toHaveLength(0);
		expect(emptyElement).toBeInTheDocument();
	});

	it('should load more users data correctly', async () => {
		renderWithStore(<UserTable />);

		expect(await screen.findAllByTestId('table-body-row')).toHaveLength(10);

		const loadMoreElement = screen.getByTestId('load-more-users');

		fireEvent.click(loadMoreElement);

		await waitFor(() => expect(screen.getAllByTestId('table-body-row')).toHaveLength(16));
	});

	it('should match snapshot', async () => {
		const container = renderWithStore(<UserTable />);

		await waitForElementToBeRemoved(screen.getByTestId('loader'));

		expect(container).toMatchSnapshot();
	});
});
