import { fireEvent, screen, render } from '@testing-library/react';
import { vi } from 'vitest';

import { TableHeaderCell } from './TableHeaderCell';

describe('TableHeaderCell', () => {
	it('should render correctly', () => {
		const handleClick = vi.fn();

		render(
			<table>
				<thead>
					<tr>
						<TableHeaderCell isSortable isActive={false} order='ascending' onClick={handleClick}>
							Test
						</TableHeaderCell>
					</tr>
				</thead>
			</table>,
		);
		const cellElement = screen.getByTestId('table-header-cell');
		const containerElement = screen.getByText(/Test/i);
		const iconElement = screen.getByTestId('icon');

		expect(containerElement).toBeInTheDocument();
		expect(cellElement).toBeInTheDocument();
		expect(iconElement).toBeInTheDocument();
	});

	it('should handle click if isSortable', () => {
		const handleClick = vi.fn();

		render(
			<table>
				<thead>
					<tr>
						<TableHeaderCell isSortable isActive order='ascending' onClick={handleClick}>
							Test
						</TableHeaderCell>
					</tr>
				</thead>
			</table>,
		);
		const cellElement = screen.getByTestId('table-header-cell');

		fireEvent.click(cellElement);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('should not handle click if not isSortable', () => {
		const handleClick = vi.fn();

		render(
			<table>
				<thead>
					<tr>
						<TableHeaderCell isSortable={false} isActive={false} order='ascending' onClick={handleClick}>
							Test
						</TableHeaderCell>
					</tr>
				</thead>
			</table>,
		);
		const cellElement = screen.getByTestId('table-header-cell');
		const iconElement = screen.queryByTestId('icon');

		expect(iconElement).not.toBeInTheDocument();

		fireEvent.click(cellElement);
		expect(handleClick).toHaveBeenCalledTimes(0);
	});

	it('should show ascending sorting if selected and isSortable', () => {
		const handleClick = vi.fn();

		render(
			<table>
				<thead>
					<tr>
						<TableHeaderCell isSortable isActive order='ascending' onClick={handleClick}>
							Test
						</TableHeaderCell>
					</tr>
				</thead>
			</table>,
		);
		const cellElement = screen.getByTestId('table-header-cell');
		const iconElement = screen.getByTestId('icon');

		expect(cellElement).toHaveAttribute('aria-sort', 'ascending');
		expect(iconElement).toBeInTheDocument();
	});

	it('should show desc sorting if selected and isSortable', () => {
		const handleClick = vi.fn();

		render(
			<table>
				<thead>
					<tr>
						<TableHeaderCell isSortable isActive order='descending' onClick={handleClick}>
							Test
						</TableHeaderCell>
					</tr>
				</thead>
			</table>,
		);
		const cellElement = screen.getByTestId('table-header-cell');
		const iconElement = screen.getByTestId('icon');

		expect(cellElement).toHaveAttribute('aria-sort', 'descending');
		expect(iconElement).toBeInTheDocument();
	});

	it('should change the cell size if the isResizable is true', () => {
		const handleClick = vi.fn();
		const CLIENT_X_MOVE = 150;
		const DEFAULT_WIDTH = 100;

		render(
			<table>
				<thead>
					<tr>
						<TableHeaderCell isSortable isActive isResizable width={100} order='ascending' onClick={handleClick}>
							Test
						</TableHeaderCell>
					</tr>
				</thead>
			</table>,
		);

		const cellElement = screen.getByTestId('table-header-cell');
		const resizerElement = screen.getByTestId('table-header-cell-resizer');

		fireEvent.mouseDown(resizerElement);
		fireEvent.mouseMove(resizerElement, {
			clientX: CLIENT_X_MOVE,
		});
		fireEvent.mouseUp(resizerElement);

		expect(cellElement).toHaveStyle(`width: ${DEFAULT_WIDTH + CLIENT_X_MOVE}px;`);
	});

	it('should not change the cell size if the isResizable is false', () => {
		const handleClick = vi.fn();
		const CLIENT_X_MOVE = 150;
		const DEFAULT_WIDTH = 100;

		render(
			<table>
				<thead>
					<tr>
						<TableHeaderCell
							isSortable
							isActive
							isResizable={false}
							width={100}
							order='ascending'
							onClick={handleClick}
						>
							Test
						</TableHeaderCell>
					</tr>
				</thead>
			</table>,
		);

		const cellElement = screen.getByTestId('table-header-cell');
		const resizerElement = screen.getByTestId('table-header-cell-resizer');

		fireEvent.mouseDown(resizerElement);
		fireEvent.mouseMove(resizerElement, {
			clientX: CLIENT_X_MOVE,
		});
		fireEvent.mouseUp(resizerElement);

		expect(cellElement).toHaveStyle(`width: ${DEFAULT_WIDTH}px;`);
	});

	it('should match snapshot', () => {
		const handleClick = vi.fn();
		const container = render(
			<table>
				<thead>
					<tr>
						<TableHeaderCell isSortable isActive={false} order='ascending' onClick={handleClick}>
							Test
						</TableHeaderCell>
					</tr>
				</thead>
			</table>,
		);

		expect(container).toMatchSnapshot();
	});
});
