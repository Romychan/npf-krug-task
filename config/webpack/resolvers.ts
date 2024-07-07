import path from 'path';

import { Configuration } from 'webpack';

import { Options } from './types';

export const resolvers = (options: Options): Configuration['resolve'] => {
	const srcPath = options.paths.src;

	return {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'~/app': path.resolve(srcPath, 'app'),
			'~/processes': path.resolve(srcPath, 'processes'),
			'~/pages': path.resolve(srcPath, 'pages'),
			'~/widgets': path.resolve(srcPath, 'widgets'),
			'~/features': path.resolve(srcPath, 'features'),
			'~/entities': path.resolve(srcPath, 'entities'),
			'~/shared': path.resolve(srcPath, 'shared'),
		},
	};
};
