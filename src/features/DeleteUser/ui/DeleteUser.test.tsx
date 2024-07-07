import { fireEvent, RenderResult, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';

import { LIMIT_USERS, UserActionTypes } from '~/entities/User';

import * as redux from '~/shared/lib/hooks';
import { renderWithStore } from '~/shared/lib/tests';

import { DeleteUser } from './DeleteUser';

const MOCK_USER_ID = 0;

describe('DeleteUser', () => {
	let mockDispatch: Mock;
	let container: RenderResult;

	beforeEach(() => {
		mockDispatch = vi.fn();

		vi.spyOn(redux, 'useAppDispatch').mockReturnValue(mockDispatch);

		container = renderWithStore(<DeleteUser id={MOCK_USER_ID} />);
	});

	it('should render correctly', () => {
		const deleteUserElement = screen.getByTestId('delete-user');
		expect(deleteUserElement).toBeInTheDocument();
	});

	it('should delete the user correctly', () => {
		const deleteUserElement = screen.getByTestId('delete-user');

		fireEvent.click(deleteUserElement);

		expect(mockDispatch).toHaveBeenCalledWith({
			payload: {
				id: MOCK_USER_ID,
				limit: LIMIT_USERS,
			},
			type: UserActionTypes.DELETE_USER_REQUEST,
		});
	});

	it('should match snapshot', () => {
		expect(container).toMatchSnapshot();
	});
});
