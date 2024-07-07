import type { Meta, StoryObj } from '@storybook/react';

import { withGapDecorator } from '../../lib/storybook';

import { Avatar } from './Avatar';

console.log(withGapDecorator);

const meta: Meta<typeof Avatar> = {
	title: 'UI/Avatar',
	component: Avatar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		size: 'sm',
		name: 'Test',
		src: 'https://robohash.org/L9Z.png?set=set4',
		isBordered: true,
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

/** This state is used to display the default. */
export const Default: Story = {
	args: {
		isBordered: false,
	},
};

/** To display the border of the avatar, the `isBordered` property is used with the `true` */
export const WithBorder: Story = {};

/** If the `src` image is missing or cannot be loaded, the first three characters will be displayed */
export const WithText: Story = {
	args: {
		isBordered: false,
		src: '',
	},
};

/**
 * The `size` property is used to change the size of the avatar.
 * - `md` is suitable for most use cases.
 * - `sm` is used to display in friend lists or in comments
 * - `xs` can be used to create very small avatars.
 */
export const AllSizes: Story = {
	decorators: [withGapDecorator],
	render: (args) => {
		return (
			<>
				<Avatar {...args} size='md' />
				<Avatar {...args} size='sm' />
				<Avatar {...args} size='xs' />
			</>
		);
	},
};

/**
 * The `radius` property is used to change the radius of the avatar.
 * - `none` makes the avatar square
 * - `auto` rounding the avatar to the default value
 * - `rounded` makes the avatar round
 */
export const AllRadius: Story = {
	decorators: [withGapDecorator],
	render: (args) => {
		return (
			<>
				<Avatar {...args} radius='none' />
				<Avatar {...args} radius='auto' />
				<Avatar {...args} radius='rounded' />
			</>
		);
	},
};
