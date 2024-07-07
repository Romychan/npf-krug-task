import path from 'path';

import { Configuration } from 'webpack';

import { webpackConfig, Mode, Paths } from './config/webpack';

interface EnvVariables {
	mode?: Mode;
	port?: number;
}

export default (env: EnvVariables) => {
	const paths: Paths = {
		output: path.resolve(__dirname, 'dist'),
		entry: path.resolve(__dirname, 'src', 'main.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		public: path.resolve(__dirname, 'public'),
		src: path.resolve(__dirname, 'src'),
		env: path.resolve(__dirname, '.env'),
	};

	const config: Configuration = webpackConfig({
		port: env.port ?? 3000,
		mode: env.mode ?? 'development',
		paths,
	});

	return config;
};
