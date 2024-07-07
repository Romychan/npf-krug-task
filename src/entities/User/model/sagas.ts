import { call, put, takeLatest } from 'redux-saga/effects';

import { createUser, deleteUser, fetchUsers } from '../api/api';
import { FetchUserResponse } from '../api/types';
import { mapUser } from '../lib/utils';

import { CreateUserRequestAction, DeleteUserRequestAction, FetchUsersRequestAction, UserActionTypes } from './types';
import {
	createUserError,
	createUserSuccess,
	deleteUserError,
	deleteUserSuccess,
	fetchUsersError,
	fetchUsersRequest,
	fetchUsersSuccess,
} from './actions';
import { LIMIT_USERS } from './constants';

/** Worker saga function for fetching users using Redux-Saga */
export function* fetchUsersWorker(action: FetchUsersRequestAction) {
	try {
		const response: FetchUserResponse = yield call(fetchUsers, action.payload);
		const transformResponse = { ...response, users: response.users.map(mapUser) };

		yield put(fetchUsersSuccess(transformResponse));
	} catch (error) {
		yield put(fetchUsersError('Error when requesting a list of users'));
	}
}

/**
 * Worker saga function for creating a user
 *
 * @param action The action object containing the payload for creating a user.
 */
export function* createUserWorker(action: CreateUserRequestAction) {
	try {
		const { user, limit } = action.payload;

		yield call(createUser, user);
		yield put(createUserSuccess());
		yield put(fetchUsersRequest({ limit: limit?.toString() || LIMIT_USERS.toString() }));
	} catch (error) {
		yield put(createUserError('Error when adding a user'));
	}
}

/**
 * Worker saga function for deleting a user using Redux-Saga
 *
 * @param action The action object containing the payload for deleting a user
 */
export function* deleteUserWorker(action: DeleteUserRequestAction) {
	try {
		const { id, limit } = action.payload;

		yield call(deleteUser, id);
		yield put(deleteUserSuccess());
		yield put(fetchUsersRequest({ limit: limit?.toString() || LIMIT_USERS.toString() }));
	} catch (error) {
		yield put(deleteUserError('Error when deleting a user'));
	}
}

/** Watcher saga function that allows to watch for user actions and trigger the appropriate worker saga to handle the action */
export function* usersSagaWatcher() {
	yield takeLatest(UserActionTypes.FETCH_USERS_REQUEST, fetchUsersWorker);
	yield takeLatest(UserActionTypes.CREATE_USER_REQUEST, createUserWorker);
	yield takeLatest(UserActionTypes.DELETE_USER_REQUEST, deleteUserWorker);
}
