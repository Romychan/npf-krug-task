import { getUsersAPIEndpoint } from '../lib/utils';
import { UserQueryParams } from '../model/types';

import { UserCreationPayload } from './types';

/**
 * The function for fetching a list of users from the server
 *
 * @returns A promise that resolves to an array of users objects if the request is successful
 */
export const fetchUsers = (queryParams: UserQueryParams) => {
	return fetch(`${process.env.BASE_API_URL}${getUsersAPIEndpoint(queryParams)}`).then((response) => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}

		return response.json();
	});
};

/**
 * The function for creating a user on the server
 *
 * @param newUser New user's data
 * @returns A promise that resolves to the created user object
 */
export const createUser = (newUser: UserCreationPayload) => {
	return fetch(`${process.env.BASE_API_URL}/users`, {
		method: 'POST',
		body: JSON.stringify(newUser),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	}).then((response) => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}

		return response.json();
	});
};

/**
 * The function for deleting a user on the server
 *
 * @param userId The ID of the user to be deleted
 *
 * @returns A promise that resolves to the deleted user object
 */
export const deleteUser = (userId: number) => {
	return fetch(`${process.env.BASE_API_URL}/users/${userId}`, {
		method: 'DELETE',
	}).then((response) => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}

		return response.json();
	});
};
