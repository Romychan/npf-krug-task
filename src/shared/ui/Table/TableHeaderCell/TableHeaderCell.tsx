import { ReactNode } from 'react';

import { cl } from '../../../lib/utils';
import { useHorizontalResize } from '../../../lib/hooks';
import { TableOrderValue } from '../types';
import { Icon } from '../../Icon';

import styles from './TableHeaderCell.module.scss';

interface ITableHeaderCellProps {
	/** Current sorting type */
	order?: TableOrderValue;
	/** The callback that will be called when sorting is selected */
	onClick: () => void;
	/** The content of the component */
	children: ReactNode;
	/**
	 * If `true`, the column is selected for sorting
	 *
	 * @default false
	 */
	isActive?: boolean;
	/**
	 * If `true`, enables sorting for the data in this column
	 *
	 * @default false
	 */
	isSortable?: boolean;
	/**
	 * If `true`, enables resizing for this column
	 *
	 * @default false
	 */
	isResizable?: boolean;
	/**
	 * Width of the column
	 *
	 * @default 100
	 */
	width?: number;
}

/** This component is used together with the `<TableHeader />` to display column names */
export const TableHeaderCell = ({
	isSortable = false,
	isActive = false,
	isResizable = false,
	order = 'none',
	width = 100,
	onClick,
	children,
}: ITableHeaderCellProps) => {
	const { isDraggable, refContainer, refResizer } = useHorizontalResize<HTMLTableCellElement>();

	const isCurrentSortable = isSortable && isActive;
	const isAscSort = isCurrentSortable && order === 'ascending';
	const isDescSort = isCurrentSortable && order === 'descending';
	const isDefaultSort = !isAscSort && !isDescSort && isSortable;

	return (
		<th
			ref={isResizable ? refContainer : null}
			onClick={isSortable ? onClick : undefined}
			style={{ width }}
			className={cl(styles.cell, {
				[styles.active]: isCurrentSortable,
				[styles.isSortable]: isSortable,
				[styles.asc]: isAscSort,
				[styles.desc]: isDescSort,
			})}
			aria-sort={isCurrentSortable ? order : 'none'}
			data-testid='table-header-cell'
		>
			{children}
			{isAscSort || isDescSort || isDefaultSort ? <Icon name='chevron' className={styles.icon} size={14} /> : null}
			<div
				className={cl(styles.resizer, {
					[styles.active]: isResizable,
				})}
				data-testid='table-header-cell-resizer'
				ref={refResizer}
			></div>
			{isDraggable ? <div className={styles.backdrop}></div> : null}
		</th>
	);
};
