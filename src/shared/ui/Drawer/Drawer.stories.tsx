import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { action } from '@storybook/addon-actions';

import { Button } from '../Button';

import { Drawer } from './Drawer';

const meta: Meta<typeof Drawer> = {
	title: 'UI/Drawer',
	component: Drawer,
	parameters: {
		layout: 'fullscreen',
		docs: {
			story: {
				inline: false,
				iframeHeight: 450,
			},
		},
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/** This state is used to default */
export const Default: Story = {
	args: {
		title: 'Title',
	},
	render: function Render(args) {
		const [{ isVisible }, updateArgs] = useArgs();

		const toggleVisible = () => {
			action('onChange')();
			updateArgs({ isVisible: !isVisible });
		};

		return (
			<div>
				<Drawer {...args} isVisible={isVisible} onClose={toggleVisible}>
					Content
				</Drawer>

				<Button onClick={toggleVisible} style={{ margin: '1rem' }}>
					Open Drawer Center
				</Button>
			</div>
		);
	},
};

/** To display the drawer from different sides, set the property `position` */
export const Position: Story = {
	args: {
		title: 'Title',
		position: 'left',
	},
	render: function Render(args) {
		const [{ isVisible, position }, updateArgs] = useArgs();

		const toggleVisible = () => {
			action('onChange')();
			updateArgs({ isVisible: !isVisible });
		};

		const handleClick = (position: string) => {
			updateArgs({ position });

			toggleVisible();
		};

		return (
			<div>
				<Drawer {...args} position={position} isVisible={isVisible} onClose={toggleVisible}>
					Content
				</Drawer>

				<Button onClick={() => handleClick('center')} style={{ margin: '1rem' }}>
					Open the drawer in the center
				</Button>
				<Button onClick={() => handleClick('left')} style={{ margin: '1rem' }}>
					Open the drawer on the left side
				</Button>
				<Button onClick={() => handleClick('right')} style={{ margin: '1rem' }}>
					Open the drawer on the right side
				</Button>
			</div>
		);
	},
};

/** To make the backdrop transparent, use the property `backdrop: transparent` */
export const WithTransparentBackdrop: Story = {
	args: {
		title: 'Title',
		backdrop: 'transparent',
		position: 'left',
	},
	render: function Render(args) {
		const [{ isVisible }, updateArgs] = useArgs();

		const toggleVisible = () => {
			action('onChange')();
			updateArgs({ isVisible: !isVisible });
		};

		return (
			<div>
				<Drawer {...args} isVisible={isVisible} onClose={toggleVisible}>
					Content
				</Drawer>

				<Button onClick={toggleVisible} style={{ margin: '1rem' }}>
					Open Drawer Left
				</Button>
			</div>
		);
	},
};
