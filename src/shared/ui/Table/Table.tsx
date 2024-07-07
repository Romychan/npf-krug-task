import { ReactNode, TableHTMLAttributes } from 'react';

import { cl } from '../../lib/utils';

import styles from './Table.module.scss';

interface ITableProps extends TableHTMLAttributes<HTMLTableElement> {
	/** Elements to display in the table: `<TableHeader />`, `<TableBody />` or other elements of the table */
	children: ReactNode;
}

/**
 * This component is used to display data in the form of a table.
 * Together with the `<TableHeader />`, `<TableBody />`, it allows to display and sort data.
 */
export const Table = ({ className, children, ...rest }: ITableProps) => {
	return (
		<table {...rest} className={cl(styles.table, className)}>
			{children}
		</table>
	);
};
