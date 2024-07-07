import { render, screen, RenderResult } from '@testing-library/react';

import { Loader } from './Loader';

describe('Loader', () => {
	let container: RenderResult;

	beforeEach(() => {
		container = render(<Loader />);
	});

	it('should render correctly', () => {
		const loaderElement = screen.getByTestId('loader');

		expect(loaderElement).toBeInTheDocument();
	});

	it('should match snapshot', () => {
		expect(container).toMatchSnapshot();
	});
});
