import type { Meta, StoryObj } from '@storybook/react';

import { userHandlers } from '~/entities/User';

import { withStoreDecorator } from '~/shared/lib/storybook';

import { DeleteUser } from './DeleteUser';

const meta = {
	title: 'Features/DeleteUser',
	component: DeleteUser,
	parameters: {
		layout: 'centered',
		msw: {
			handlers: userHandlers,
		},
	},
	decorators: [withStoreDecorator],
	tags: ['autodocs'],
} satisfies Meta<typeof DeleteUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: 0,
	},
};
