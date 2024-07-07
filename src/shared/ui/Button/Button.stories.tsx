import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../Icon';
import { ICONS_TYPES } from '../Icon/constants';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
	title: 'UI/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		color: 'primary',
		size: 'md',
		isIconOnly: false,
	},
	decorators: [
		(Story) => (
			<div
				style={{
					display: 'flex',
					alignItems: 'flex-start',
					flexWrap: 'wrap',
					gap: '1rem',
				}}
			>
				<Story />
			</div>
		),
	],
	argTypes: {
		onClick: { action: 'onClick' },
		variant: {
			control: { type: 'select' },
		},
		size: {
			control: { type: 'select' },
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

/** This state is used to display the default. */
export const Default: Story = {
	args: {
		children: 'Primary',
	},
};

/** This state is used to display the disabled variant. */
export const Disabled: Story = {
	args: {
		children: 'Disabled',
		disabled: true,
	},
};

/** This state is used to display the icon. */
export const WithIcon: Story = {
	args: {
		children: <Icon name={ICONS_TYPES[0]} />,
		isIconOnly: true,
	},
};

/**
 * The `variant` property is used to change the variant of the button.
 * - `filled` is used for basic actions, it is clearly visible
 * - `ghost` is used for less important actions, with a transparent background
 * - `bordered` is used for secondary actions, the frame is not filled
 * - `light` is used for basic actions in the dark interface
 * - `link` is used to navigate to another web page
 * - `flat` is used for a minimalistic design, less noticeable
 */
export const AllVariants: Story = {
	render: (args) => {
		return (
			<>
				<Button {...args} variant='filled'>
					Filled
				</Button>
				<Button {...args} variant='ghost'>
					Ghost
				</Button>
				<Button {...args} variant='bordered'>
					Bordered
				</Button>
				<Button {...args} variant='light'>
					Light
				</Button>
				<Button {...args} variant='link'>
					Link
				</Button>
				<Button {...args} variant='flat'>
					Flat
				</Button>
			</>
		);
	},
};

/**
 * The `variant` property is used to change the variant of the button.
 * - `default` is used to perform secondary actions or options.
 * - `primary` is usually used to perform the main action.
 * - `success` can be used to confirm the action or inform the user about the successful completion of the operation.
 * - `danger` is designed to displace dangerous or irreversible operations. For example, to delete files or data.
 * - `warning` is used for actions that are not critical, but may be important to the user.
 */
export const AllColors: Story = {
	render: (args) => {
		return (
			<>
				<Button {...args} color='default'>
					Default
				</Button>
				<Button {...args} color='primary'>
					Primary
				</Button>
				<Button {...args} color='success'>
					Success
				</Button>
				<Button {...args} color='danger'>
					Danger
				</Button>
				<Button {...args} color='warning'>
					Warning
				</Button>
			</>
		);
	},
};

/**
 * The `size` property is used to change the size of the button.
 * - `lg` can be used to display important items on the screen
 * - `md` is the main one for performing basic operations
 * - `sm` can be used to perform operations, depending on the context. For example, calling additional menus.
 * - `xs` is used to perform minor or secondary operations
 */
export const AllSizes: Story = {
	render: (args) => {
		return (
			<>
				<Button {...args} size='lg'>
					Size LG
				</Button>
				<Button {...args} size='md'>
					Size MD
				</Button>
				<Button {...args} size='sm'>
					Size SM
				</Button>
				<Button {...args} size='xs'>
					Size XS
				</Button>
				<Button {...args} size='xxs'>
					Size XXS
				</Button>
			</>
		);
	},
};
