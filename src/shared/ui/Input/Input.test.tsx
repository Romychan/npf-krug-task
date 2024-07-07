import { fireEvent, screen, render } from '@testing-library/react';
import { vi } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
	it('should render correctly', () => {
		render(<Input type='password' placeholder='test' />);
		const inputElement = screen.getByTestId<HTMLInputElement>('input-field');

		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toHaveAttribute('placeholder', 'test');
		expect(inputElement).toHaveAttribute('type', 'password');
	});

	it('should render correctly with variant', () => {
		render(<Input variant='unstyled' />);

		const inputElement = screen.getByTestId<HTMLInputElement>('input-field');

		expect(inputElement.getAttribute('class')).toMatch('unstyled');
		expect(inputElement.getAttribute('class')).not.toMatch('bordered');
	});

	it('should render correctly with size', () => {
		render(<Input size='sm' />);

		const inputElement = screen.getByTestId<HTMLInputElement>('input-field');

		expect(inputElement.getAttribute('class')).toMatch('sm');
		expect(inputElement.getAttribute('class')).not.toMatch('xs');
	});

	it('should shows error', () => {
		render(<Input error />);
		const inputElement = screen.getByTestId<HTMLInputElement>('input-field');

		expect(inputElement.getAttribute('class')).toMatch(/error/gi);
	});

	it('should apply rest props', () => {
		render(<Input maxLength={16} />);
		const inputElement = screen.getByTestId<HTMLInputElement>('input-field');

		expect(inputElement).toHaveAttribute('maxLength', '16');
	});

	it('should handle change value', () => {
		const handleChange = vi.fn();

		render(<Input onChange={handleChange} />);

		const inputElement = screen.getByTestId<HTMLInputElement>('input-field');

		fireEvent.change(inputElement, { target: { value: 'test' } });
		expect(inputElement.value).toBe('test');
	});

	it('should match snapshot', () => {
		const handleChange = vi.fn();
		const container = render(<Input onChange={handleChange} placeholder='test' />);

		expect(container).toMatchSnapshot();
	});
});
