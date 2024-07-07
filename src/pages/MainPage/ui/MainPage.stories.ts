import type { Meta, StoryObj } from '@storybook/react';

import { userHandlers } from '~/entities/User';

import { withAppProvidersDecorator } from '~/shared/lib/storybook';

import { MainPage } from './MainPage';

const meta = {
	title: 'Pages/MainPage',
	parameters: {
		msw: {
			handlers: userHandlers,
		},
		layout: 'fullscreen',
	},
	component: MainPage,
	decorators: [withAppProvidersDecorator],
	tags: ['autodocs'],
} satisfies Meta<typeof MainPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
