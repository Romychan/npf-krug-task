import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import { Options } from './types';

export const devServer = (options: Options): DevServerConfiguration => {
	return {
		port: options.port ?? 3000,
		open: true,
		hot: true,
	};
};
