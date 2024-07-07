import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_COLUMNS, MOCK_SORTING, MockUser } from '../__mocks__/table';

import { TableHeader } from './TableHeader';

const meta: Meta<typeof TableHeader<MockUser, keyof MockUser>> = {
	title: 'UI/Table/TableHeader',
	component: TableHeader,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: { onSort: { action: 'onSort' } },
	decorators: [
		(Story) => (
			<table style={{ borderCollapse: 'collapse' }}>
				<Story />
			</table>
		),
	],
};

export default meta;
type Story = StoryObj<typeof meta>;

/** This state is used to default. */
export const Default: Story = {
	args: {
		columns: MOCK_COLUMNS,
		sorting: MOCK_SORTING,
	},
};

/** To resize a cell, use the `isResizable` property for a column in the columns list. */
export const Resizable: Story = {
	args: {
		columns: MOCK_COLUMNS.map((column) => ({ ...column, isResizable: true })),
		sorting: MOCK_SORTING,
	},
};
