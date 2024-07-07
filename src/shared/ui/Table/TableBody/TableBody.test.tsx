import { screen, render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import { MOCK_COLUMNS, MOCK_DATA_TABLE } from '../__mocks__/table';

import { TableBody } from './TableBody';

describe('TableBody', () => {
	it('should render correctly', () => {
		render(
			<table>
				<TableBody columns={MOCK_COLUMNS} data={MOCK_DATA_TABLE} isLoading={false} />
			</table>,
		);
		const tableBodyElement = screen.getByTestId('table-body');
		const cellEmailElement = screen.getByText(/test@test.test/i);

		expect(tableBodyElement).toBeInTheDocument();
		expect(cellEmailElement).toBeInTheDocument();
	});

	it('should render loading element', () => {
		render(
			<table>
				<TableBody columns={MOCK_COLUMNS} data={[]} isLoading={true} />
			</table>,
		);
		const loaderElement = screen.getByTestId('loader');

		expect(loaderElement).toBeInTheDocument();
	});

	it('should render with empty data', () => {
		render(
			<table>
				<TableBody columns={MOCK_COLUMNS} data={[]} isLoading={false} />
			</table>,
		);

		const emptyElement = screen.getByTestId('table-body-empty');

		expect(emptyElement).toBeInTheDocument();
	});

	it('should render with error', () => {
		render(
			<table>
				<TableBody columns={MOCK_COLUMNS} data={[]} isLoading={false} isError />
			</table>,
		);

		const emptyElement = screen.getByTestId('table-body-empty');

		expect(emptyElement).toBeInTheDocument();
	});

	it('should handle click on a row', () => {
		const handleClick = vi.fn();

		render(
			<table>
				<TableBody columns={MOCK_COLUMNS} data={MOCK_DATA_TABLE} isLoading={false} onRowClick={handleClick} />
			</table>,
		);

		const rowElement = screen.getByTestId('table-body-row');

		fireEvent.click(rowElement);

		expect(handleClick).toHaveBeenCalled();
	});

	it('should match snapshot', () => {
		const container = render(
			<table>
				<TableBody columns={MOCK_COLUMNS} data={MOCK_DATA_TABLE} isLoading={false} />
			</table>,
		);

		expect(container).toMatchSnapshot();
	});
});
