import { fireEvent, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';

import { LIMIT_USERS, LIMIT_USERS_INCREASE, MOCK_USER_STORE, UserActionTypes } from '~/entities/User';

import * as redux from '~/shared/lib/hooks';
import { renderWithStore } from '~/shared/lib/tests';

import { LoadUser } from './LoadUser';

describe('LoadUser', () => {
	let mockDispatch: Mock;

	beforeEach(() => {
		mockDispatch = vi.fn();
		vi.spyOn(redux, 'useAppDispatch').mockReturnValue(mockDispatch);
	});

	it('should render correctly', () => {
		renderWithStore(<LoadUser />, { preloadedState: { users: { ...MOCK_USER_STORE, total: 20 } } });

		const loadUserElement = screen.getByTestId('load-more-users');

		expect(loadUserElement).toBeInTheDocument();
	});

	it('should not render component when limit is more than total', () => {
		renderWithStore(<LoadUser />);

		const loadUserElement = screen.queryByTestId('load-more-users');

		expect(loadUserElement).not.toBeInTheDocument();
	});

	it('should load the user correctly', () => {
		renderWithStore(<LoadUser increaseLimit={LIMIT_USERS_INCREASE} />, {
			preloadedState: { users: { ...MOCK_USER_STORE, total: 20 } },
		});

		const loadUserElement = screen.getByTestId('load-more-users');

		fireEvent.click(loadUserElement);

		expect(mockDispatch).toHaveBeenCalledWith({
			type: UserActionTypes.FETCH_USERS_REQUEST,
			payload: {
				limit: `${LIMIT_USERS_INCREASE + LIMIT_USERS}`,
			},
		});
	});

	it('should match snapshot', () => {
		const container = renderWithStore(<LoadUser />, { preloadedState: { users: { ...MOCK_USER_STORE, total: 20 } } });

		expect(container).toMatchSnapshot();
	});
});
