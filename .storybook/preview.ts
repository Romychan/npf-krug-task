import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';

import '../src/app/assets/styles/style.scss';

initialize({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		options: {
			storySort: {
				order: ['Pages', 'Widgets', 'Features', 'Entities', 'UI'],
			},
		},
	},
	loaders: [mswLoader],
};

export default preview;
