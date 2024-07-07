import type { Meta, StoryObj } from '@storybook/react';

import { withGapDecorator } from '../../../lib/storybook';
import { Button } from '../../Button';
import { ToastContext } from '../context/context';

import { ToastProvider } from './ToastProvider';

/** This story is intended to demonstrate how `<ToastProvider />` works with all components */
const meta: Meta<typeof ToastProvider> = {
	title: 'UI/Toasts',
	component: ToastProvider,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		position: {
			control: { type: 'select' },
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	decorators: [withGapDecorator],
	render: (args) => {
		return (
			<ToastProvider {...args}>
				<ToastContext.Consumer>
					{(context) =>
						context ? (
							<>
								<Button
									onClick={() =>
										context.addToast({
											title: 'Success toast',
											type: 'success',
										})
									}
									color='success'
								>
									Success Toast
								</Button>
								<Button onClick={() => context.addToast({ title: 'Error toast', type: 'error' })} color='danger'>
									Error Toast
								</Button>
								<Button
									onClick={() =>
										context.addToast({
											title: 'Warning toast',
											type: 'warning',
										})
									}
									color='warning'
								>
									Warning Toast
								</Button>
							</>
						) : null
					}
				</ToastContext.Consumer>
			</ToastProvider>
		);
	},
};
