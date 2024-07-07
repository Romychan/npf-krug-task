import { drop, factory } from '@mswjs/data';
import { faker } from '@faker-js/faker';

import { createUserModel, generateRandomUser, MOCK_USER } from './models/user';

const database = factory({
	users: createUserModel(),
});

/** The function for creating a mock database */
const createDatabase = () => {
	if (database.users.count() > 0) {
		return;
	}

	faker.seed(2500);

	database.users.create(MOCK_USER);

	const newUsers = faker.helpers.multiple(generateRandomUser, {
		count: 15,
	});

	newUsers.forEach((user) => database.users.create(user));
};

/**
 * The function for initializing a mock database
 *
 * @returns Mock database
 */
export const initMockDatabase = () => {
	createDatabase();

	return database;
};

/**
 * The function to reset the database to its initial state
 *
 * @returns Initial mock database
 */
export const resetMockDatabase = () => {
	drop(database);
	createDatabase();

	return database;
};
