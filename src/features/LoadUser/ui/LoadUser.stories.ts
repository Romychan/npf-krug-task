import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_USER_STORE, userHandlers } from '~/entities/User';

import { withStoreDecorator } from '~/shared/lib/storybook';

import { LoadUser } from './LoadUser';

const meta = {
	title: 'Features/LoadUser',
	component: LoadUser,
	parameters: {
		layout: 'centered',
		preloadState: {
			users: { ...MOCK_USER_STORE, total: 20 },
		},
		msw: {
			handlers: userHandlers,
		},
	},
	decorators: [withStoreDecorator],
	tags: ['autodocs'],
} satisfies Meta<typeof LoadUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
