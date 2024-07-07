import type { Meta, StoryObj } from '@storybook/react';

import { TableHeaderCell } from './TableHeaderCell';

const meta: Meta<typeof TableHeaderCell> = {
	title: 'UI/Table/TableHeaderCell',
	component: TableHeaderCell,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		isActive: false,
		order: 'ascending',
		width: 200,
	},
	argTypes: { onClick: { action: 'onClick' } },
	decorators: [
		(Story) => (
			<table>
				<thead>
					<tr>
						<Story />
					</tr>
				</thead>
			</table>
		),
	],
};

export default meta;
type Story = StoryObj<typeof meta>;

/** This state is used to default. */
export const Default: Story = {
	args: {
		isSortable: false,
		children: 'Default',
	},
};

/** The `order` property is used to change the sorting option. To sort in ascending order, use `order: 'asc'` */
export const AscSorting: Story = {
	args: {
		isActive: true,
		isSortable: true,
		children: 'Asc Sorting',
	},
};

/** To sort in descending order, use `order: 'desc'` */
export const DescSorting: Story = {
	args: {
		isActive: true,
		isSortable: true,
		order: 'descending',
		children: 'Desc Sorting',
	},
};

/** To resize a cell, use `isResizable: true` */
export const Resizable: Story = {
	args: {
		isResizable: true,
		isActive: true,
		isSortable: true,
		width: 100,
		order: 'descending',
		children: 'Resizable',
	},
};
