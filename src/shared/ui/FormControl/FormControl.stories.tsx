import type { Meta, StoryObj } from '@storybook/react';

import { withGapDecorator } from '../../lib/storybook';
import { Input } from '../Input';
import { DefaultInput, ErrorInput } from '../Input';

import { FormControl } from './FormControl';

const meta: Meta<typeof FormControl> = {
	title: 'UI/FormControl',
	component: FormControl,
	parameters: {
		layout: 'centered',
	},
	args: {
		label: 'Label',
		labelId: 'field',
		variant: 'primary',
		labelPosition: 'top',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/** This state is used to default. */
export const Default: Story = {
	render: (args) => (
		<FormControl {...args}>
			<Input {...DefaultInput.args} />
		</FormControl>
	),
};

/** The `error` is used to provide information to the user about the error */
export const Error: Story = {
	args: {
		error: 'Error message',
	},
	render: (args) => (
		<FormControl {...args}>
			<Input {...ErrorInput.args} />
		</FormControl>
	),
};

/** The `required` is used to marks the label as required */
export const Required: Story = {
	args: {
		required: true,
	},
	render: (args) => (
		<FormControl {...args}>
			<Input {...DefaultInput.args} />
		</FormControl>
	),
};

/**
 * The `variant` property is used to change the variant of the form label.
 * - `primary` is usually used to perform the main action.
 * - `secondary` is used to perform secondary actions or options.
 */
export const AllVariants: Story = {
	decorators: [withGapDecorator],
	render: (args) => {
		return (
			<>
				<FormControl {...args} variant='primary'>
					<Input {...DefaultInput.args} />
				</FormControl>
				<FormControl {...args} variant='secondary'>
					<Input {...DefaultInput.args} />
				</FormControl>
			</>
		);
	},
};

/**
 * The `position` property is used to change the position of the label relative to the field
 * - `top` is used to display the label above the field.
 * - `left` is used to display the label on the left relative to the field
 * - `right` is used to display the label on the right relative to the field
 */
export const AllLabelPositions: Story = {
	decorators: [withGapDecorator],
	render: (args) => {
		return (
			<>
				<FormControl {...args} labelPosition='top'>
					<Input {...DefaultInput.args} />
				</FormControl>
				<FormControl {...args} labelPosition='left'>
					<Input {...DefaultInput.args} />
				</FormControl>
				<FormControl {...args} labelPosition='right'>
					<Input {...DefaultInput.args} />
				</FormControl>
			</>
		);
	},
};
