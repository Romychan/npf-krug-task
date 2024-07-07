import { fireEvent, screen, render } from '@testing-library/react';
import { vi } from 'vitest';

import { MOCK_COLUMNS, MOCK_SORTING } from '../__mocks__/table';

import { TableHeader } from './TableHeader';

describe('TableHeader', () => {
	it('should render correctly', () => {
		const handleClick = vi.fn();

		render(
			<table>
				<TableHeader columns={MOCK_COLUMNS} sorting={MOCK_SORTING} onSort={handleClick} />
			</table>,
		);
		const columnElement = screen.getByText(/Profile/i);

		expect(columnElement).toBeInTheDocument();
	});

	it('should handle click if isSortable', () => {
		const handleClick = vi.fn();

		render(
			<table>
				<TableHeader columns={MOCK_COLUMNS} sorting={MOCK_SORTING} onSort={handleClick} />
			</table>,
		);

		const cellElement = screen.getAllByTestId('table-header-cell')[0];
		const iconElement = screen.getAllByTestId('icon')[0];

		expect(cellElement).toHaveAttribute('aria-sort', 'ascending');
		expect(iconElement).toBeInTheDocument();

		fireEvent.click(cellElement);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('should not handle click if not isSortable', () => {
		const handleClick = vi.fn();

		render(
			<table>
				<TableHeader columns={MOCK_COLUMNS} sorting={MOCK_SORTING} onSort={handleClick} />
			</table>,
		);
		const cellElement = screen.getAllByTestId('table-header-cell')[2];

		fireEvent.click(cellElement);
		expect(handleClick).toHaveBeenCalledTimes(0);
	});

	it('should match snapshot', () => {
		const handleClick = vi.fn();
		const container = render(
			<table>
				<TableHeader columns={MOCK_COLUMNS} sorting={MOCK_SORTING} onSort={handleClick} />
			</table>,
		);

		expect(container).toMatchSnapshot();
	});
});
