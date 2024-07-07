import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_USER } from '../../api/__mocks__/mocks';

import { UserCard } from './UserCard';

const meta = {
	title: 'Entities/UserCard',
	component: UserCard,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** This state is used to display the default */
export const Default: Story = {
	args: {
		avatar: MOCK_USER.image,
		name: MOCK_USER.name,
		username: MOCK_USER.username,
	},
};

/** If the `avatar` is missing, the first three characters will be displayed */
export const WithoutAvatar: Story = {
	args: {
		name: MOCK_USER.name,
		username: MOCK_USER.username,
	},
};
