import { fireEvent, screen, render } from '@testing-library/react';
import { vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
	it('should render correctly', () => {
		render(<Button variant='light'>Test</Button>);
		const buttonElement = screen.getByRole('button');

		expect(buttonElement).toBeInTheDocument();
		expect(buttonElement.getAttribute('class')).toMatch(/light/gi);
	});

	it('should render correctly with size', () => {
		render(<Button size='md'>Button</Button>);

		const buttonElement = screen.getByRole('button');

		expect(buttonElement.getAttribute('class')).toMatch('md');
		expect(buttonElement.getAttribute('class')).not.toMatch('xs');
	});

	it('should render correctly with variant', () => {
		render(<Button variant='flat'>Button</Button>);

		const buttonElement = screen.getByRole('button');

		expect(buttonElement.getAttribute('class')).toMatch('flat');
		expect(buttonElement.getAttribute('class')).not.toMatch('light');
	});

	it('should handle click', () => {
		const handleClick = vi.fn();

		render(<Button onClick={handleClick}>Test</Button>);
		const buttonElement = screen.getByRole('button');

		fireEvent.click(buttonElement);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('should disabled handle click', () => {
		const handleClick = vi.fn();

		render(
			<Button onClick={handleClick} disabled>
				Test
			</Button>,
		);
		const buttonElement = screen.getByRole('button');

		expect(buttonElement).toBeDisabled();
		fireEvent.click(buttonElement);
		expect(handleClick).toHaveBeenCalledTimes(0);
	});

	it('should match snapshot', () => {
		const handleClick = vi.fn();
		const container = render(<Button onClick={handleClick}>Test</Button>);

		expect(container).toMatchSnapshot();
	});
});
