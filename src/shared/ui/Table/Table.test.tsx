import { render, screen, RenderResult } from '@testing-library/react';

import { MOCK_COLUMNS, MOCK_DATA_TABLE } from './__mocks__/table';
import { Table } from './Table';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';

describe('Table', () => {
	let container: RenderResult;

	beforeEach(() => {
		container = render(
			<Table>
				<TableHeader columns={MOCK_COLUMNS} sorting={{ column: 'id', order: 'ascending' }} />
				<TableBody columns={MOCK_COLUMNS} data={MOCK_DATA_TABLE} />
			</Table>,
		);
	});

	it('should render correctly', () => {
		const headerCellElement = screen.getAllByTestId('table-header-cell');
		const tableBodyElement = screen.getByTestId('table-body');

		expect(headerCellElement).toHaveLength(3);
		expect(tableBodyElement).toBeInTheDocument();
	});

	it('should match snapshot', () => {
		expect(container).toMatchSnapshot();
	});
});
