import type { Meta, StoryObj } from '@storybook/react';

import { withWidthDecorator } from '../../../lib/storybook';
import { MOCK_COLUMNS, MOCK_DATA_TABLE, MockUser } from '../__mocks__/table';

import { TableBody } from './TableBody';

const meta: Meta<typeof TableBody<MockUser, keyof MockUser>> = {
	title: 'UI/Table/TableBody',
	component: TableBody,
	parameters: {
		layout: 'centered',
		width: '420px',
	},
	argTypes: {
		onRowClick: { action: 'onRowClick' },
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<table style={{ borderCollapse: 'collapse', width: '100%' }}>
				<Story />
			</table>
		),
		withWidthDecorator,
	],
};

export default meta;
type Story = StoryObj<typeof meta>;

/** This state is used to default. */
export const Default: Story = {
	args: {
		data: MOCK_DATA_TABLE,
		columns: MOCK_COLUMNS,
		isLoading: false,
	},
};

/** The property `isLoading` indicates whether the table body is loaded. If the value is `true`, the `<Loader />` is displayed. */
export const Loading: Story = {
	args: {
		data: [],
		columns: MOCK_COLUMNS,
		isLoading: true,
	},
};

/** If the data list is empty and the load is complete, an empty table will be displayed */
export const Empty: Story = {
	args: {
		data: [],
		columns: MOCK_COLUMNS,
		isLoading: false,
	},
};
