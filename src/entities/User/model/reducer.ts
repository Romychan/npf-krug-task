import { LIMIT_USERS } from './constants';
import { UserActionTypes, UserActions, UserState } from './types';

const initialState: UserState = {
	users: [],
	total: 0,
	limit: LIMIT_USERS,
	isLoading: false,
	error: null,
	message: null,
};

/**
 * A function for controlling the state of the user store
 *
 * @param state State for the store
 * @param action Type of action
 *
 * @returns Updated state
 */
export const userReducer = (state = initialState, action: UserActions): UserState => {
	switch (action.type) {
		case UserActionTypes.FETCH_USERS_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case UserActionTypes.FETCH_USERS_SUCCESS:
			return {
				...state,
				isLoading: false,
				users: action.payload.users,
				total: action.payload.total,
				limit: action.payload.limit,
			};
		case UserActionTypes.FETCH_USERS_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload.message,
			};
		case UserActionTypes.CREATE_USER_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
				message: null,
			};
		case UserActionTypes.CREATE_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				message: 'The user has been successfully created',
			};
		case UserActionTypes.CREATE_USER_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload.message,
			};
		case UserActionTypes.DELETE_USER_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
				message: null,
			};
		case UserActionTypes.DELETE_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				message: 'The user has been successfully deleted',
			};
		case UserActionTypes.DELETE_USER_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload.message,
			};
		default:
			return state;
	}
};
