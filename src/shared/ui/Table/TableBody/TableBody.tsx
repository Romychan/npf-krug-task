import { IColumnTable, MinTableItem } from '../types';
import { Loader } from '../../Loader';
import { cl } from '../../../lib/utils';

import styles from './TableBody.module.scss';

/**
 * The interface of a table body component
 *
 * @template T Basic data interface
 * @template K List of keys from the `T` base interface
 */
interface ITableBodyProps<T, K extends keyof T> {
	/** The data for the table to display */
	data: T[];
	/** The list of columns to display in the table */
	columns: IColumnTable<T, K>[];
	/**
	 * Whether the body of the table is loaded. If `true`, the `<Loader />` is displayed
	 *
	 * @default false
	 */
	isLoading?: boolean;
	/**
	 * Are there any errors in the request. If `true`, an empty table is displayed
	 *
	 * @default false
	 */
	isError?: boolean;
	/**
	 * The callback that will be called when you click on a row
	 *
	 * @param item Data from the selected row
	 */
	onRowClick?: (item: T) => void;
}

/**
 * This is a component for displaying table data.
 *
 * @template T Basic data interface
 * @template K List of keys from the `T` base interface
 */
export const TableBody = <T extends MinTableItem, K extends keyof T>({
	data = [],
	columns,
	onRowClick,
	isLoading = false,
	isError = false,
}: ITableBodyProps<T, K>) => {
	const renderRows = () => {
		if ((!isLoading && !data.length) || isError) {
			return (
				<tr className={styles.placeholder}>
					<td colSpan={columns.length} data-testid='table-body-empty'>
						Empty Data
					</td>
				</tr>
			);
		} else if (data.length) {
			return data.map((item, index) => {
				return (
					<tr
						key={item.id}
						className={cl(styles.row, { [styles.clickable]: !!onRowClick })}
						aria-rowindex={index}
						onClick={() => (onRowClick ? onRowClick(item) : undefined)}
						data-testid='table-body-row'
					>
						{columns.map(({ accessor, renderCell }) => (
							<td
								key={accessor as string}
								className={styles.cell}
								data-testid={`table-body-cell-${accessor as string}`}
							>
								{renderCell ? renderCell({ currentData: item }) : (item[accessor] as string)}
							</td>
						))}
					</tr>
				);
			});
		} else {
			return (
				<tr className={styles.placeholder}>
					<td colSpan={columns.length}>
						<Loader className={styles.loader} />
					</td>
				</tr>
			);
		}
	};

	return (
		<tbody data-testid='table-body' className={styles.body}>
			{renderRows()}
		</tbody>
	);
};
