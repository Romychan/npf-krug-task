import { ReactNode } from 'react';

/** Basic type with types of sorting */
export type TableOrderValue = 'none' | 'ascending' | 'descending';

/** The basic interface of the table data */
export interface MinTableItem {
	/** A unique ID for a table row */
	id: number | string;
}

/**
 * Interface with properties for defining the table sorting method
 *
 * @template T Basic data interface
 * @template K List of keys from the `T` base interface
 */
export interface ISortingTable<T, K extends keyof T> {
	/** The column to which the sorting is applied */
	column: K;
	/** Type of sorting */
	order: TableOrderValue;
}

/**
 * Interface with properties for a custom component in a table cell
 * @template T Basic data interface
 *  */
export interface IRenderedCell<T> {
	/** An object with data for a cell with a custom component */
	currentData: T;
}

/**
 * The basic interface of a table column
 *
 * @template T Basic data interface
 * @template K List of keys from the `T` base interface
 */
export interface IColumnTable<T, K extends keyof T> {
	/** Displayed column name */
	label: string;
	/** The key for displaying data that is taken from the list of table data */
	accessor: K;
	/** Availability of sorting for this column */
	isSortable?: boolean;
	/** Availability of column resizing for this column */
	isResizable?: boolean;
	/** Type of sorting */
	order?: string;
	/** Default column width */
	width?: number;
	/**
	 * A callback that is used to display a custom component in a table cell
	 *
	 * @param props Data from the current row of the table
	 *
	 * @returns Custom cell component
	 */
	renderCell?: (props: IRenderedCell<T>) => ReactNode;
}
