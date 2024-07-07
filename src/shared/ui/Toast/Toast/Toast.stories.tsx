import type { Meta, StoryObj } from '@storybook/react';

import { ToastContext } from '../context/context';

import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
	title: 'UI/Toasts/Toast',
	component: Toast,
	parameters: {
		layout: 'centered',
	},
	args: {
		id: Math.floor(Math.random() * 1000),
		title: 'Toast Notification',
		duration: 0,
		type: 'success',
	},
	decorators: [
		(Story) => (
			<ToastContext.Provider value={{ toasts: [], addToast: () => {}, deleteToast: () => {} }}>
				<Story />
			</ToastContext.Provider>
		),
	],
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * - `success` is used to display a message about the successful completion of the operation.
 * - `error` is used to output an error message
 * - `warning` is used to display a warning message
 */
export const Default: Story = {};

/** The `text` property is used to display an additional message */
export const WithText: Story = {
	args: {
		text: 'Additional Text',
	},
};

/**
 * The `variant` property is used to change the variant of the toast.
 * - `filled` sets the background for component
 * - `bordered` sets the border for component
 */
export const AllVariants: Story = {
	render: (args) => {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
				<div style={{ display: 'flex', gap: '16px' }}>
					<Toast {...args} variant='filled' type='success' />
					<Toast {...args} variant='filled' type='error' />
					<Toast {...args} variant='filled' type='warning' />
				</div>

				<div style={{ display: 'flex', gap: '16px' }}>
					<Toast {...args} variant='bordered' type='success' />
					<Toast {...args} variant='bordered' type='error' />
					<Toast {...args} variant='bordered' type='warning' />
				</div>
			</div>
		);
	},
};
