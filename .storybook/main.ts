import type { StorybookConfig } from '@storybook/react-webpack5';
import webpackConfig from '../webpack.config';
import path from 'path';
import { Configuration } from 'webpack';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-webpack5-compiler-swc',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
		{
			name: '@storybook/preset-scss',
			options: {
				cssLoaderOptions: {
					modules: {
						namedExport: false,
						exportLocalsConvention: 'as-is',
						localIdentName: '[path][name]__[local]',
					},
				},
			},
		},
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	staticDirs: [path.join(__dirname, '../public')],
	webpackFinal: async (config) => {
		return {
			...config,
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve?.alias,
					'~': path.resolve(__dirname, '../src'),
				},
			},
		};
	},
	swc: () => ({
		jsc: {
			transform: {
				react: {
					runtime: 'automatic',
				},
			},
		},
	}),
};
export default config;
