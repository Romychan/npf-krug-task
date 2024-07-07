import { MOCK_USER } from '../../api/__mocks__/mocks';
import { MOCK_USER_STORE } from '../__mocks__';
import { userReducer } from '../reducer';
import {
	CreateUserErrorAction,
	CreateUserRequestAction,
	CreateUserSuccessAction,
	DeleteUserErrorAction,
	DeleteUserRequestAction,
	DeleteUserSuccessAction,
	FetchUsersErrorAction,
	FetchUsersRequestAction,
	FetchUsersSuccessAction,
	UserActions,
	UserActionTypes,
} from '../types';

describe('userReducer', () => {
	it('should return the initial state', () => {
		expect(userReducer(undefined, {} as UserActions)).toEqual(MOCK_USER_STORE);
	});

	it('should handle FETCH_USERS_REQUEST', () => {
		const action = {
			type: UserActionTypes.FETCH_USERS_REQUEST,
			payload: { limit: '10' },
		} as FetchUsersRequestAction;

		const expectedState = {
			...MOCK_USER_STORE,
			isLoading: true,
			error: null,
		};

		expect(userReducer(MOCK_USER_STORE, action)).toEqual(expectedState);
	});

	it('should handle FETCH_USERS_SUCCESS', () => {
		const action = {
			type: UserActionTypes.FETCH_USERS_SUCCESS,
			payload: {
				users: [MOCK_USER],
				total: 1,
				limit: 10,
			},
		} as FetchUsersSuccessAction;

		const expectedState = {
			...MOCK_USER_STORE,
			isLoading: false,
			users: action.payload.users,
			total: action.payload.total,
			limit: action.payload.limit,
		};

		expect(userReducer(MOCK_USER_STORE, action)).toEqual(expectedState);
	});

	it('should handle FETCH_USERS_ERROR', () => {
		const action = {
			type: UserActionTypes.FETCH_USERS_ERROR,
			payload: {
				message: 'Error fetching users',
			},
		} as FetchUsersErrorAction;

		const expectedState = {
			...MOCK_USER_STORE,
			isLoading: false,
			error: action.payload.message,
		};

		expect(userReducer(MOCK_USER_STORE, action)).toEqual(expectedState);
	});

	it('should handle CREATE_USER_REQUEST', () => {
		const action = {
			type: UserActionTypes.CREATE_USER_REQUEST,
		} as CreateUserRequestAction;

		const expectedState = {
			...MOCK_USER_STORE,
			isLoading: true,
			error: null,
			message: null,
		};

		expect(userReducer(MOCK_USER_STORE, action)).toEqual(expectedState);
	});

	it('should handle CREATE_USER_SUCCESS', () => {
		const action = {
			type: UserActionTypes.CREATE_USER_SUCCESS,
		} as CreateUserSuccessAction;

		const expectedState = {
			...MOCK_USER_STORE,
			isLoading: false,
			message: 'The user has been successfully created',
		};

		expect(userReducer(MOCK_USER_STORE, action)).toEqual(expectedState);
	});

	it('should handle CREATE_USER_ERROR', () => {
		const action = {
			type: UserActionTypes.CREATE_USER_ERROR,
			payload: {
				message: 'Error creating user',
			},
		} as CreateUserErrorAction;

		const expectedState = {
			...MOCK_USER_STORE,
			isLoading: false,
			error: action.payload.message,
		};

		expect(userReducer(MOCK_USER_STORE, action)).toEqual(expectedState);
	});

	it('should handle DELETE_USER_REQUEST', () => {
		const action = {
			type: UserActionTypes.DELETE_USER_REQUEST,
		} as DeleteUserRequestAction;

		const expectedState = {
			...MOCK_USER_STORE,
			isLoading: true,
			error: null,
			message: null,
		};

		expect(userReducer(MOCK_USER_STORE, action)).toEqual(expectedState);
	});

	it('should handle DELETE_USER_SUCCESS', () => {
		const action = {
			type: UserActionTypes.DELETE_USER_SUCCESS,
		} as DeleteUserSuccessAction;

		const expectedState = {
			...MOCK_USER_STORE,
			isLoading: false,
			message: 'The user has been successfully deleted',
		};

		expect(userReducer(MOCK_USER_STORE, action)).toEqual(expectedState);
	});

	it('should handle DELETE_USER_ERROR', () => {
		const action = {
			type: UserActionTypes.DELETE_USER_ERROR,
			payload: {
				message: 'Error deleting user',
			},
		} as DeleteUserErrorAction;

		const expectedState = {
			...MOCK_USER_STORE,
			isLoading: false,
			error: action.payload.message,
		};

		expect(userReducer(MOCK_USER_STORE, action)).toEqual(expectedState);
	});
});
