import { render, screen } from '@testing-library/react';

import { FormControl } from './FormControl';

describe('FormControl', () => {
	it('should render correctly', () => {
		render(<FormControl label='Test'>Input</FormControl>);

		const formElement = screen.getByText(/test/i);
		const childElement = screen.getByText(/input/i);
		const errorElement = screen.queryByRole('alert');

		expect(formElement).toBeInTheDocument();
		expect(childElement).toBeInTheDocument();
		expect(errorElement).not.toBeInTheDocument();
	});

	it('should display the error message  correctly', () => {
		render(
			<FormControl label='Test' error='Error Message'>
				Input
			</FormControl>,
		);

		const formElement = screen.getByText(/test/i);
		const childElement = screen.getByText(/input/i);
		const errorElement = screen.queryByRole('alert');

		expect(formElement).toBeInTheDocument();
		expect(childElement).toBeInTheDocument();
		expect(errorElement).toBeInTheDocument();
	});

	it('should match snapshot', () => {
		const container = render(<FormControl label='Test'>Input</FormControl>);
		expect(container).toMatchSnapshot();
	});
});
