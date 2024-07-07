import type { Meta, StoryObj } from '@storybook/react';

import { withGapDecorator } from '../../lib/storybook';

import { ICONS_TYPES } from './constants';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
	title: 'UI/Icon',
	component: Icon,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		size: 24,
	},
	argTypes: {
		stroke: {
			control: {
				type: 'color',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

/** This state is used to default. */
export const Default: Story = {
	args: {
		name: ICONS_TYPES[0],
	},
};

/** A list of icons used in the project is displayed here. */
export const AllIcons: Story = {
	render: (args) => {
		return (
			<>
				{ICONS_TYPES.map((icon) =>
					icon.includes('filled') ? (
						<Icon key={icon} {...args} name={icon} stroke='none' strokeWidth={0} fill='#000000' />
					) : (
						<Icon key={icon} {...args} name={icon} />
					),
				)}
			</>
		);
	},
	decorators: [withGapDecorator],
};
