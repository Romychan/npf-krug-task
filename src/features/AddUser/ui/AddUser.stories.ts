import type { Meta, StoryObj } from '@storybook/react';

import { userHandlers } from '~/entities/User';

import { withHeightDecorator, withStoreDecorator } from '~/shared/lib/storybook';

import { AddUser } from './AddUser';

const meta = {
	title: 'Features/AddUser',
	component: AddUser,
	parameters: {
		layout: 'padded',
		msw: {
			handlers: userHandlers,
		},
	},
	decorators: [withStoreDecorator, withHeightDecorator],
	tags: ['autodocs'],
} satisfies Meta<typeof AddUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
