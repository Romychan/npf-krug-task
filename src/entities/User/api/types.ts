import { User } from '../model/types';

/** Basic user type from the server */
export interface UserDTO {
	id: number;
	name: string;
	username: string;
	email: string;
	image: string;
}

/** The payload type of the new user for the server */
export interface UserCreationPayload extends Omit<User, 'id' | 'image'> {}

/** Type of the original response returned from fetch for users */
export interface FetchUserResponse {
	/** List of users */
	users: UserDTO[];
	/** The total number of users */
	total: number;
	/** Limit the number of users returned by the query */
	limit: number;
}

/** The type of transformed response after fetching a user */
export interface UserResponse {
	/** List of users */
	users: User[];
	/** The total number of users */
	total: number;
	/** Limit the number of users returned by the query */
	limit: number;
}

/** The type of request to create a user */
export interface CreateUserRequest {
	/** New user */
	user: UserCreationPayload;
	/** Limit the number of users returned by the query */
	limit?: number;
}

/** The type of request to delete a user */
export interface DeleteUserRequest extends Pick<User, 'id'> {
	/** Limit the number of users returned by the query */
	limit?: number;
}

/** The type of response with an error */
export interface UserResponseError {
	/** A message describing the error */
	message: string;
}
