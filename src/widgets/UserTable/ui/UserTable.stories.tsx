import type { Meta, StoryObj } from '@storybook/react';

import { userHandlers } from '~/entities/User';

import { withStoreDecorator } from '~/shared/lib/storybook';

import { UserTable } from './UserTable';

const meta = {
	title: 'Widgets/UserTable',
	component: UserTable,
	parameters: {
		layout: 'padded',
		msw: {
			handlers: userHandlers,
		},
	},
	decorators: [withStoreDecorator],
	tags: ['autodocs'],
} satisfies Meta<typeof UserTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
