import { render, RenderResult, screen } from '@testing-library/react';

import { MOCK_USER } from '../../api/__mocks__/mocks';

import { UserCard } from './UserCard';

describe('UserCard', () => {
	let container: RenderResult;

	beforeEach(() => {
		container = render(<UserCard avatar={MOCK_USER.image} name={MOCK_USER.name} username={MOCK_USER.username} />);
	});

	it('should render correctly', () => {
		const cardElement = screen.getByTestId('user-card');

		expect(cardElement).toBeInTheDocument();
	});

	it('should match snapshot', () => {
		expect(container).toMatchSnapshot();
	});
});
