import type { Meta, StoryObj } from '@storybook/react';

import { withWidthDecorator } from '../../lib/storybook';

import { MOCK_COLUMNS, MOCK_SORTING } from './__mocks__/table';
import { Table } from './Table';
import { TableBody, TableHeader } from '.';
import { TableBodyDefault, TableBodyEmpty, TableBodyLoading } from './TableBody';
import { TableHeaderDefault, TableHeaderResizable } from './TableHeader';

const meta: Meta<typeof Table> = {
	title: 'UI/Table',
	component: Table,
	parameters: {
		layout: 'centered',
		width: '600px',
	},
	decorators: [withWidthDecorator],
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/** This state is used to default. */
export const Default: Story = {
	render: function Render(args) {
		return (
			<Table {...args}>
				<TableHeader
					{...TableHeaderDefault.args}
					columns={TableHeaderDefault.args?.columns || []}
					sorting={TableHeaderDefault.args?.sorting || MOCK_SORTING}
				/>
				<TableBody
					{...TableBodyDefault.args}
					columns={TableBodyDefault.args?.columns || []}
					data={TableBodyDefault.args?.data || []}
				/>
			</Table>
		);
	},
};

/** To resize a cell, use the `isResizable` property for a column in the columns list. */
export const Resizable: Story = {
	args: {
		style: {
			width: 'max-content',
		},
	},
	render: function Render(args) {
		return (
			<div style={{ overflowX: 'auto' }}>
				<Table {...args}>
					<TableHeader
						{...TableHeaderResizable.args}
						columns={TableHeaderResizable.args?.columns || []}
						sorting={TableHeaderResizable.args?.sorting || MOCK_SORTING}
					/>
					<TableBody
						{...TableBodyDefault.args}
						columns={TableBodyDefault.args?.columns || []}
						data={TableBodyDefault.args?.data || []}
					/>
				</Table>
			</div>
		);
	},
};

/**
 * The property `isLoading` indicates whether the table body is loaded.
 * If the value is `true`, the `<Loader />` is displayed.
 */
export const Loading: Story = {
	render: function Render(args) {
		return (
			<Table {...args}>
				<TableHeader
					{...TableHeaderDefault.args}
					columns={TableHeaderDefault.args?.columns || []}
					sorting={TableHeaderDefault.args?.sorting || MOCK_SORTING}
				/>
				<TableBody {...TableBodyLoading.args} columns={TableBodyLoading.args?.columns || MOCK_COLUMNS} data={[]} />
			</Table>
		);
	},
};

/** If the data list is empty and the load is complete, an empty table will be displayed */
export const Empty: Story = {
	render: function Render(args) {
		return (
			<Table {...args}>
				<TableHeader
					{...TableHeaderDefault.args}
					columns={TableHeaderDefault.args!.columns || []}
					sorting={TableHeaderDefault.args?.sorting || MOCK_SORTING}
				/>
				<TableBody {...TableBodyEmpty.args} columns={TableBodyEmpty.args?.columns || MOCK_COLUMNS} data={[]} />
			</Table>
		);
	},
};
