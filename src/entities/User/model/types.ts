import { Action } from 'redux';

import { CreateUserRequest, DeleteUserRequest, UserResponse, UserResponseError } from '../api/types';

/** Base interface for user */
export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	image: string;
}

/** Interface with query parameters for the user */
export interface UserQueryParams {
	/** Limit the number of users returned by the query */
	limit: string;
}

/** The base state interface for store */
export interface UserState {
	users: User[];
	total: number;
	limit: number;
	error: string | null;
	message: string | null;
	isLoading: boolean;
}

/** An enum containing the different action types */
export enum UserActionTypes {
	FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST',
	FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
	FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
	CREATE_USER_REQUEST = 'CREATE_USER_REQUEST',
	CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',
	CREATE_USER_ERROR = 'CREATE_USER_ERROR',
	DELETE_USER_REQUEST = 'DELETE_USER_REQUEST',
	DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS',
	DELETE_USER_ERROR = 'DELETE_USER_ERROR',
}

/** Type of action to request users */
export interface FetchUsersRequestAction extends Action<UserActionTypes.FETCH_USERS_REQUEST> {
	type: UserActionTypes.FETCH_USERS_REQUEST;
	payload: UserQueryParams;
}

/** Type of action for a successful user request */
export interface FetchUsersSuccessAction extends Action {
	type: UserActionTypes.FETCH_USERS_SUCCESS;
	payload: UserResponse;
}

/** Type of action to request users with an error */
export interface FetchUsersErrorAction extends Action {
	type: UserActionTypes.FETCH_USERS_ERROR;
	payload: UserResponseError;
}

/** Type of action to create user */
export interface CreateUserRequestAction extends Action {
	type: UserActionTypes.CREATE_USER_REQUEST;
	payload: CreateUserRequest;
}

/** Type of action to successfully create a user */
export interface CreateUserSuccessAction extends Action {
	type: UserActionTypes.CREATE_USER_SUCCESS;
}

/** Type of action to create user with an error */
export interface CreateUserErrorAction extends Action {
	type: UserActionTypes.CREATE_USER_ERROR;
	payload: UserResponseError;
}

/** Type of action to delete user */
export interface DeleteUserRequestAction extends Action {
	type: UserActionTypes.DELETE_USER_REQUEST;
	payload: DeleteUserRequest;
}

/** Type of action to successfully delete a user */
export interface DeleteUserSuccessAction extends Action {
	type: UserActionTypes.DELETE_USER_SUCCESS;
}

/** Type of action to delete user with an error */
export interface DeleteUserErrorAction extends Action {
	type: UserActionTypes.DELETE_USER_ERROR;
	payload: UserResponseError;
}

/** List of all user type actions */
export type UserActions =
	| FetchUsersRequestAction
	| FetchUsersSuccessAction
	| FetchUsersErrorAction
	| CreateUserRequestAction
	| CreateUserSuccessAction
	| CreateUserErrorAction
	| DeleteUserRequestAction
	| DeleteUserSuccessAction
	| DeleteUserErrorAction;
