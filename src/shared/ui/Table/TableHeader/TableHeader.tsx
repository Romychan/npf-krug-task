import { TableOrderValue, IColumnTable, ISortingTable } from '../types';
import { TableHeaderCell } from '../TableHeaderCell';

import styles from './TableHeader.module.scss';

/**
 * The interface of a table header component
 *
 * @template T Basic data interface
 * @template K List of keys from the `T` base interface
 */
interface ITableHeaderProps<T, K extends keyof T> {
	/** The list of columns to display in the table */
	columns: IColumnTable<T, K>[];
	/** Column name and sort type for sorting values */
	sorting?: ISortingTable<T, K>;
	/**
	 * The callback that will be called when sorting is selected
	 *
	 * @param accessor The key of the current sorting column
	 * @param order The type of current sorting
	 */
	onSort?: (accessor: K, order: TableOrderValue) => void;
}

/**
 * This is a component for displaying table column headers
 *
 * @template T Basic data interface
 * @template K List of keys from the `T` base interface
 */
export const TableHeader = <T, K extends keyof T>({ columns, sorting, onSort }: ITableHeaderProps<T, K>) => {
	const handleSortChange = (accessor: K) => {
		if (onSort && sorting) {
			const sortOrder = sorting.column === accessor && sorting.order === 'ascending' ? 'descending' : 'ascending';

			onSort(accessor, sortOrder);
		}
	};

	return (
		<thead className={styles.header}>
			<tr className={styles.row}>
				{columns.map(({ label, accessor, width, isSortable, isResizable }) => (
					<TableHeaderCell
						key={accessor as string}
						order={sorting?.order}
						width={width}
						isSortable={isSortable}
						isActive={accessor === sorting?.column}
						isResizable={isResizable}
						onClick={() => handleSortChange(accessor)}
					>
						{label}
					</TableHeaderCell>
				))}
			</tr>
		</thead>
	);
};
