import { Decorator } from '@storybook/react';

/**
 * This decorator is designed to limit the width of the component in the story.
 * The width is set by parameters.width. If the width is not specified, the default value is 400px
 */
export const withWidthDecorator: Decorator = (Story, { parameters }) => {
	const width = parameters.width ?? '400px';

	return (
		<div style={{ width, margin: 'auto' }}>
			<Story />
		</div>
	);
};
