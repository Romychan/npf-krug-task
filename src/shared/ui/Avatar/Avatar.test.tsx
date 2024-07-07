import { fireEvent, render, screen } from '@testing-library/react';

import { Avatar } from './Avatar';

describe('Avatar', () => {
	it('should render correctly', () => {
		render(<Avatar src='test-src' name='Test' />);

		const avatarElement = screen.getByTestId('avatar');

		expect(avatarElement).toBeInTheDocument();
	});

	it('should render correctly with size', () => {
		render(<Avatar name='Test' size='md' />);

		const avatarElement = screen.getByTestId('avatar');

		expect(avatarElement.getAttribute('class')).toMatch('md');
		expect(avatarElement.getAttribute('class')).not.toMatch('xs');
	});

	it('should render correctly with radius', () => {
		render(<Avatar name='Test' radius='none' />);

		const avatarElement = screen.getByTestId('avatar');

		expect(avatarElement.getAttribute('class')).toMatch('none');
		expect(avatarElement.getAttribute('class')).not.toMatch('rounded');
	});

	it('should render the text if the image has an error', () => {
		render(<Avatar src='test-src' name='Test' radius='none' />);

		const imageElement = screen.getByRole('img');
		const placeholderText = screen.queryByTestId('avatar-text');

		expect(imageElement.getAttribute('src')).toMatch('test-src');
		expect(placeholderText).not.toBeInTheDocument();

		fireEvent.error(imageElement);

		expect(screen.getByTestId('avatar-text')).toBeInTheDocument();
	});

	it('should match snapshot', () => {
		const container = render(<Avatar src='test-src' name='Test' />);

		expect(container).toMatchSnapshot();
	});
});
