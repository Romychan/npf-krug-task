import { UserDTO } from '../api/types';
import { User, UserQueryParams } from '../model/types';

/**
 * A function for transforming a user object from a `UserDTO` model to a `User`
 *
 * @param user An object with user data from the server
 *
 * @returns The transformed object with user data
 */
export const mapUser = (user: UserDTO): User => {
	return {
		id: user.id,
		name: user.name,
		username: user.username,
		email: user.email,
		image: user.image,
	};
};

/**
 * A function for getting an API endpoint with a list of users
 *
 * @param queryParams Query parameters for the endpoint
 *
 * @returns API endpoint for getting a list of users
 */
export const getUsersAPIEndpoint = (queryParams: UserQueryParams) =>
	`/users?${new URLSearchParams({ ...queryParams }).toString()}`;
