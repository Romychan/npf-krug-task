import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';

import { Options } from './types';

export const loaders = (options: Options): ModuleOptions['rules'] => {
	const isDev = options.mode === 'development';

	const assetsLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: 'asset/resource',
	};

	const fontsLoader = {
		test: /\.(woff|woff2|eot|ttf|otf)$/i,
		type: 'asset/resource',
	};

	const cssModuleLoader = {
		loader: 'css-loader',
		options: {
			modules: {
				namedExport: false,
				exportLocalsConvention: 'as-is',
				localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
			},
		},
	};

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, cssModuleLoader, 'sass-loader'],
	};

	const tsLoader = {
		exclude: /node_modules/,
		test: /\.tsx?$/,
		use: [
			{
				loader: 'ts-loader',
				options: {
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
					}),
				},
			},
		],
	};

	return [scssLoader, tsLoader, assetsLoader, fontsLoader];
};
