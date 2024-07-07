import type { Meta, StoryObj } from '@storybook/react';

import { withGapDecorator } from '../../lib/storybook';

import { Input } from './Input';

const meta = {
	title: 'UI/Input',
	component: Input,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		name: 'field',
		id: 'field',
	},
	argTypes: {
		variant: {
			control: { type: 'select' },
		},
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** This state is used to default. */
export const Default: Story = {
	args: {
		defaultValue: 'Default',
		placeholder: 'test',
	},
};

/** The `error` is used to provide information to the user about the error. */
export const Error: Story = {
	args: {
		defaultValue: 'Error',
		error: true,
	},
};

/**
 * The `variant` property is used to change the variant of the input.
 * - `filled` sets the background for component
 * - `unfilled` sets a transparent background for the component
 * - `bordered` sets the border for component
 * - `unstyled` is used to reset the color and paddings
 */
export const AllVariants: Story = {
	decorators: [withGapDecorator],
	render: (args) => {
		return (
			<>
				<Input {...args} variant='filled' defaultValue='Filled' />
				<Input {...args} variant='unfilled' defaultValue='Unfilled' />
				<Input {...args} variant='bordered' defaultValue='Bordered' />
				<Input {...args} variant='unstyled' defaultValue='Unstyled' />
			</>
		);
	},
};

/**
 * The `size` property is used to change the size of the button.
 * - `lg` can be used for long texts or notes
 * - `md` is the main one for performing basic operations
 * - `sm` can be used for short texts
 * - `xs` can be used to select from several options or to check the correctness of the input
 */
export const AllSizes: Story = {
	decorators: [withGapDecorator],
	render: (args) => {
		return (
			<>
				<Input {...args} defaultValue='Size XS' size='xs' />
				<Input {...args} defaultValue='Size SM' size='sm' />
				<Input {...args} defaultValue='Size MD' size='md' />
				<Input {...args} defaultValue='Size LG' size='lg' />
			</>
		);
	},
};
