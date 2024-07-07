import type { Meta, StoryObj } from '@storybook/react';

import { userHandlers } from '~/entities/User';

import { withStoreDecorator, withWidthDecorator } from '~/shared/lib/storybook';

import { AddForm } from './AddForm';

const meta = {
	title: 'Features/AddUser/AddForm',
	component: AddForm,
	parameters: {
		layout: 'centered',
		width: '420px',
		msw: {
			handlers: userHandlers,
		},
	},
	decorators: [withStoreDecorator, withWidthDecorator],
	argTypes: {
		onComplete: { action: 'onComplete' },
	},
	tags: ['autodocs'],
} satisfies Meta<typeof AddForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { onComplete: () => {} },
};
