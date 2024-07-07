import { CreateUserRequest, DeleteUserRequest, UserResponse } from '../api/types';

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
	UserActionTypes,
	UserQueryParams,
} from './types';

/**
 * Action creator for fetching users request
 *
 * @returns The action that represents the fetching of users
 */
export const fetchUsersRequest = (queryParams: UserQueryParams): FetchUsersRequestAction => ({
	type: UserActionTypes.FETCH_USERS_REQUEST,
	payload: queryParams,
});

/**
 * Action creator for fetching users success
 *
 * @param data The users list and total users count received from the server
 * @returns  The action that represents the successful fetching of users
 */
export const fetchUsersSuccess = (data: UserResponse): FetchUsersSuccessAction => ({
	type: UserActionTypes.FETCH_USERS_SUCCESS,
	payload: data,
});

/**
 * Action creator for fetching users error
 *
 * @param error The error message received from the server
 * @returns The action that represents the unsuccessful fetching of users
 */
export const fetchUsersError = (error: string): FetchUsersErrorAction => ({
	type: UserActionTypes.FETCH_USERS_ERROR,
	payload: {
		message: error,
	},
});

/**
 * Action creator for creating a user request
 *
 * @param data The new user to be created
 * @return The action that represents the creation of the user
 */
export const createUserRequest = (data: CreateUserRequest): CreateUserRequestAction => ({
	type: UserActionTypes.CREATE_USER_REQUEST,
	payload: data,
});

/**
 * Action creator for creating a user success
 *
 * @return The action that represents the successful creation of the user
 */
export const createUserSuccess = (): CreateUserSuccessAction => ({
	type: UserActionTypes.CREATE_USER_SUCCESS,
});

/**
 * Action creator for creating a user error
 *
 * @param error The error message received from the server
 * @return The action that represents the unsuccessful creation of the user
 */
export const createUserError = (error: string): CreateUserErrorAction => ({
	type: UserActionTypes.CREATE_USER_ERROR,
	payload: {
		message: error,
	},
});

/**
 * Action creator for deleting a user request
 *
 * @param data The user to be deleted
 * @return The action that represents the deletion of the user
 */
export const deleteUserRequest = (data: DeleteUserRequest): DeleteUserRequestAction => ({
	type: UserActionTypes.DELETE_USER_REQUEST,
	payload: data,
});

/**
 * Action creator for deleting a user success.
 *
 * @return The action that represents the successful deletion of the user
 */
export const deleteUserSuccess = (): DeleteUserSuccessAction => ({
	type: UserActionTypes.DELETE_USER_SUCCESS,
});

/**
 * Action creator for deleting a user error.
 *
 * @param error The error message received from the server
 * @return The action that represents the unsuccessful deletion of the user
 */
export const deleteUserError = (error: string): DeleteUserErrorAction => ({
	type: UserActionTypes.DELETE_USER_ERROR,
	payload: {
		message: error,
	},
});
