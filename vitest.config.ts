import path from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: path.resolve(__dirname, 'src/setupTest.ts'),
	},
	resolve: {
		alias: {
			'~/app': path.resolve(__dirname, 'src/app'),
			'~/processes': path.resolve(__dirname, 'src/processes'),
			'~/pages': path.resolve(__dirname, 'src/pages'),
			'~/widgets': path.resolve(__dirname, 'src/widgets'),
			'~/features': path.resolve(__dirname, 'src/features'),
			'~/entities': path.resolve(__dirname, 'src/entities'),
			'~/shared': path.resolve(__dirname, 'src/shared'),
		},
	},
});
