import { Decorator } from '@storybook/react';

/**
 * This decorator is designed to limit the height of a component in the story.
 * The height is set by parameters.height. If the height is not specified, the default value is 100vh
 */
export const withHeightDecorator: Decorator = (Story, { parameters }) => {
	const height = parameters.height ?? '100vh';

	return (
		<div
			style={{
				transform: 'scale(1)',
				overflowX: 'hidden',
				height,
			}}
		>
			<Story />
		</div>
	);
};
