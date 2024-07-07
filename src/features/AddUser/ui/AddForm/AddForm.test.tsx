import { fireEvent, screen, waitFor, RenderResult } from '@testing-library/react';
import { Mock, vi } from 'vitest';

import { LIMIT_USERS, UserActionTypes } from '~/entities/User';

import * as redux from '~/shared/lib/hooks';
import { renderWithStore } from '~/shared/lib/tests';

import { AddForm } from './AddForm';

const MOCK_NEW_FORM_USER = [
	{
		field: /^name/i,
		value: 'Name',
	},
	{
		field: /username/i,
		value: 'Username',
	},
	{
		field: /email/i,
		value: 'test@test.test',
	},
];

describe('AddForm', () => {
	let mockDispatch: Mock;
	let handleComplete: Mock<never, never>;
	let container: RenderResult;

	beforeEach(() => {
		mockDispatch = vi.fn();
		handleComplete = vi.fn();

		vi.spyOn(redux, 'useAppDispatch').mockReturnValue(mockDispatch);

		container = renderWithStore(<AddForm onComplete={handleComplete} />);
	});

	it('should render correctly', () => {
		expect(screen.getAllByRole('textbox')).toHaveLength(3);
		expect(screen.queryAllByRole('alert')).toHaveLength(0);
		expect(screen.getByTestId('add-user')).toBeInTheDocument();
		expect(screen.getByTestId('cancel-add-user')).toBeInTheDocument();
	});

	it('should handle clicking on the cancel button correctly', () => {
		const cancelButton = screen.getByTestId('cancel-add-user');

		fireEvent.click(cancelButton);

		expect(handleComplete).toHaveBeenCalled();
	});

	it('should display an error if not all fields have been filled in', async () => {
		fillFormInputs();

		fireEvent.change(screen.getByRole('textbox', { name: /^name/i }), {
			target: { value: '' },
		});

		fireEvent.change(screen.getByRole('textbox', { name: /username/i }), {
			target: { value: '' },
		});

		fireEvent.submit(screen.getByTestId('add-user'));

		expect(await screen.findAllByRole('alert')).toHaveLength(2);
		expect(handleComplete).not.toHaveBeenCalled();
		expect(mockDispatch).not.toHaveBeenCalled();
	});

	it('should display matching error when email is invalid', async () => {
		fillFormInputs();

		fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
			target: { value: '123' },
		});

		fireEvent.submit(screen.getByTestId('add-user'));

		expect(await screen.findAllByRole('alert')).toHaveLength(1);
		expect(handleComplete).not.toHaveBeenCalled();
		expect(mockDispatch).not.toHaveBeenCalled();
	});

	it('should not display error when value is valid', async () => {
		fillFormInputs();

		fireEvent.submit(screen.getByTestId('add-user'));

		await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));

		expect(handleComplete).toHaveBeenCalledTimes(1);
		expect(mockDispatch).toHaveBeenCalledWith({
			payload: {
				user: {
					name: 'Name',
					username: 'Username',
					email: 'test@test.test',
				},
				limit: LIMIT_USERS,
			},
			type: UserActionTypes.CREATE_USER_REQUEST,
		});
	});

	it('should match snapshot', () => {
		expect(container).toMatchSnapshot();
	});
});

const fillFormInputs = () => {
	MOCK_NEW_FORM_USER.map(({ field, value }) =>
		fireEvent.change(screen.getByRole('textbox', { name: field }), {
			target: { value },
		}),
	);
};
