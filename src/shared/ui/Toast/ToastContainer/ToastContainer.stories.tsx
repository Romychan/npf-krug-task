import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import { withGapDecorator } from '../../../lib/storybook';
import { Button } from '../../Button';
import { ToastContext } from '../context/context';
import { TOAST_POSITIONS } from '../constants';

import { ToastContainer } from './ToastContainer';

const meta: Meta<typeof ToastContainer> = {
	title: 'UI/Toasts/ToastContainer',
	component: ToastContainer,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<ToastContext.Provider value={{ toasts: [], addToast: () => {}, deleteToast: () => {} }}>
				<Story />
			</ToastContext.Provider>
		),
	],
	argTypes: {
		position: {
			control: { type: 'select' },
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

/** To display the toasts from different sides, set the property `position` */
export const AllPositions: Story = {
	decorators: [withGapDecorator],
	render: function Render(args) {
		const [{ position, toasts }, updateArgs] = useArgs();

		const changePosition = (position: string) => {
			updateArgs({
				position,
				toasts: [
					{
						id: Math.floor(Math.random() * 100),
						title: position,
						type: 'success',
					},
				],
			});
		};

		return (
			<>
				<ToastContainer {...args} toasts={toasts || []} position={position} />

				{TOAST_POSITIONS.map((position) => (
					<Button key={position} onClick={() => changePosition(position)}>
						{position}
					</Button>
				))}
			</>
		);
	},
};
