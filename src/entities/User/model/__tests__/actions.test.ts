import { MOCK_USER } from '../../api/__mocks__/mocks';
import {
	createUserError,
	createUserRequest,
	createUserSuccess,
	deleteUserError,
	deleteUserRequest,
	deleteUserSuccess,
	fetchUsersError,
	fetchUsersRequest,
	fetchUsersSuccess,
} from '../actions';
import { UserActionTypes } from '../types';

describe('fetchUsersRequest', () => {
	it('should create a FETCH_USERS_REQUEST action', () => {
		const queryParams = {
			limit: '10',
		};

		const expectedAction = {
			type: UserActionTypes.FETCH_USERS_REQUEST,
			payload: queryParams,
		};

		expect(fetchUsersRequest(queryParams)).toEqual(expectedAction);
	});
});

describe('fetchUsersSuccess', () => {
	it('should create a FETCH_USERS_SUCCESS action', () => {
		const data = {
			users: [MOCK_USER],
			total: 1,
			limit: 10,
		};

		const expectedAction = {
			type: UserActionTypes.FETCH_USERS_SUCCESS,
			payload: data,
		};

		expect(fetchUsersSuccess(data)).toEqual(expectedAction);
	});
});

describe('fetchUsersError', () => {
	it('should create a FETCH_USERS_ERROR action', () => {
		const error = 'Error fetching users';

		const expectedAction = {
			type: UserActionTypes.FETCH_USERS_ERROR,
			payload: {
				message: error,
			},
		};

		expect(fetchUsersError(error)).toEqual(expectedAction);
	});
});

describe('createUserRequest', () => {
	it('should create a CREATE_USER_REQUEST action', () => {
		const newUser = {
			name: 'Test Name',
			username: 'testname',
			email: 'test@test.test',
		};

		const expectedAction = {
			type: UserActionTypes.CREATE_USER_REQUEST,
			payload: { user: newUser },
		};

		expect(createUserRequest({ user: newUser })).toEqual(expectedAction);
	});

	it('should create a CREATE_USER_REQUEST action with limit parameter', () => {
		const newUser = {
			name: 'Test Name',
			username: 'testname',
			email: 'test@test.test',
		};

		const expectedAction = {
			type: UserActionTypes.CREATE_USER_REQUEST,
			payload: { user: newUser, limit: 20 },
		};

		expect(createUserRequest({ user: newUser, limit: 20 })).toEqual(expectedAction);
	});
});

describe('createUserSuccess', () => {
	it('should create a CREATE_USER_SUCCESS action', () => {
		const expectedAction = {
			type: UserActionTypes.CREATE_USER_SUCCESS,
		};

		expect(createUserSuccess()).toEqual(expectedAction);
	});
});

describe('createUserError', () => {
	it('should create a CREATE_USER_ERROR action', () => {
		const error = 'Error creating user';

		const expectedAction = {
			type: UserActionTypes.CREATE_USER_ERROR,
			payload: {
				message: error,
			},
		};

		expect(createUserError(error)).toEqual(expectedAction);
	});
});

describe('deleteUserRequest', () => {
	it('should create a DELETE_USER_REQUEST action', () => {
		const data = {
			id: 1,
		};

		const expectedAction = {
			type: UserActionTypes.DELETE_USER_REQUEST,
			payload: data,
		};

		expect(deleteUserRequest(data)).toEqual(expectedAction);
	});

	it('should create a DELETE_USER_REQUEST action with limit parameter', () => {
		const data = {
			id: 1,
			limit: 20,
		};

		const expectedAction = {
			type: UserActionTypes.DELETE_USER_REQUEST,
			payload: data,
		};

		expect(deleteUserRequest(data)).toEqual(expectedAction);
	});
});

describe('deleteUserSuccess', () => {
	it('should create a DELETE_USER_SUCCESS action', () => {
		const expectedAction = {
			type: UserActionTypes.DELETE_USER_SUCCESS,
		};

		expect(deleteUserSuccess()).toEqual(expectedAction);
	});
});

describe('deleteUserError', () => {
	it('should create a DELETE_USER_ERROR action', () => {
		const error = 'Error deleting user';

		const expectedAction = {
			type: UserActionTypes.DELETE_USER_ERROR,
			payload: {
				message: error,
			},
		};

		expect(deleteUserError(error)).toEqual(expectedAction);
	});
});
