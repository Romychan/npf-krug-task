import { RenderResult, render, screen } from '@testing-library/react';

import { Icon } from './Icon';
import { ICONS_TYPES } from './constants';

describe('Icon', () => {
	let container: RenderResult;

	beforeEach(() => {
		container = render(<Icon name={ICONS_TYPES[0]} size={18} stroke='#ffffff' />);
	});

	it('should render correctly', () => {
		const icon = screen.getByTestId('icon');

		expect(icon).toBeInTheDocument();
		expect(icon.getAttribute('stroke')).toMatch(/#ffffff/gi);
	});

	it('should match snapshot', () => {
		expect(container).toMatchSnapshot();
	});
});
