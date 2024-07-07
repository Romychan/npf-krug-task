import { Decorator } from '@storybook/react';

/**
 * This decorator is designed to set the `gap` between components in the story.
 * The distance is set by `parameters.gap`. If the gap is not specified, the default value is 1rem
 */
export const withGapDecorator: Decorator = (Story, { parameters }) => {
	const gap = parameters.gap ?? '1rem';

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'flex-start',
				flexWrap: 'wrap',
				gap,
			}}
		>
			<Story />
		</div>
	);
};
