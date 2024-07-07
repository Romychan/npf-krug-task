import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';

import { fetchUsers, createUser, deleteUser } from '../../api/api';
import { FetchUserResponse } from '../../api/types';
import { mapUser } from '../../lib/utils';
import {
	fetchUsersRequest,
	fetchUsersSuccess,
	fetchUsersError,
	createUserRequest,
	createUserSuccess,
	createUserError,
	deleteUserRequest,
	deleteUserSuccess,
	deleteUserError,
} from '../actions';
import { MOCK_USER } from '../../api/__mocks__/mocks';
import { fetchUsersWorker, createUserWorker, deleteUserWorker } from '../sagas';

describe('fetchUsersWorker', () => {
	it('should dispatch fetchUsersSuccess with the correct payload', () => {
		const action = fetchUsersRequest({ limit: '10' });
		const response: FetchUserResponse = {
			users: [MOCK_USER],
			total: 1,
			limit: 10,
		};

		return expectSaga(fetchUsersWorker, action)
			.provide([[call(fetchUsers, action.payload), response]])
			.put(fetchUsersSuccess({ ...response, users: response.users.map(mapUser) }))
			.run();
	});

	it('should dispatch fetchUsersError when an error occurs', () => {
		const action = fetchUsersRequest({ limit: '10' });
		const error = new Error('Error');

		return expectSaga(fetchUsersWorker, action)
			.provide([[call(fetchUsers, action.payload), throwError(error)]])
			.put(fetchUsersError('Error when requesting a list of users'))
			.run();
	});
});

describe('createUserWorker', () => {
	it('should dispatch createUserSuccess and fetchUsersRequest with the correct payload', () => {
		const action = createUserRequest({ user: MOCK_USER, limit: 10 });

		return expectSaga(createUserWorker, action)
			.provide([[call(createUser, action.payload.user), undefined]])
			.put(createUserSuccess())
			.put(fetchUsersRequest({ limit: '10' }))
			.run();
	});

	it('should dispatch createUserError when an error occurs', () => {
		const action = createUserRequest({ user: MOCK_USER, limit: 10 });
		const error = new Error('Error when adding a user');

		return expectSaga(createUserWorker, action)
			.provide([[call(createUser, action.payload.user), throwError(error)]])
			.put(createUserError('Error when adding a user'))
			.run();
	});
});

describe('deleteUserWorker', () => {
	it('should dispatch deleteUserSuccess and fetchUsersRequest with the correct payload', () => {
		const action = deleteUserRequest({ id: 1, limit: 10 });

		return expectSaga(deleteUserWorker, action)
			.provide([[call(deleteUser, action.payload.id), undefined]])
			.put(deleteUserSuccess())
			.put(fetchUsersRequest({ limit: '10' }))
			.run();
	});

	it('should dispatch deleteUserError when an error occurs', () => {
		const action = deleteUserRequest({ id: 1, limit: 10 });
		const error = new Error('Error when deleting a user');

		return expectSaga(deleteUserWorker, action)
			.provide([[call(deleteUser, action.payload.id), throwError(error)]])
			.put(deleteUserError('Error when deleting a user'))
			.run();
	});
});
