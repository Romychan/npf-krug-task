import { primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';

const countUp = (() => {
	let id = 2;
	return () => id++;
})();

/**
 * The function for generating mock users using faker
 *
 * @returns An object with a mock user
 */
export const generateRandomUser = () => {
	const firstName = faker.person.firstName();
	const lastName = faker.person.lastName();

	return {
		id: countUp(),
		name: `${firstName} ${lastName}`,
		username: faker.internet.userName({ firstName }),
		email: faker.internet.email({
			firstName,
			lastName,
		}),
		image: faker.image.avatarGitHub(),
	};
};

/**
 * The function to create a user model for a `@mswjs/data` database
 *
 * @returns User model for database
 */
export const createUserModel = () => {
	const firstName = faker.person.firstName();
	const lastName = faker.person.lastName();

	return {
		id: primaryKey(() => faker.number.int()),
		name: () => `${firstName} ${lastName}`,
		lastName: () => lastName,
		username: () => faker.internet.userName({ firstName }),
		email: () =>
			faker.internet.email({
				firstName,
				lastName,
			}),
		image: () => faker.image.avatarGitHub(),
	};
};

export const MOCK_USER = {
	id: 1,
	name: 'Test Name',
	username: 'testname',
	email: 'test@test.test',
	image: 'https://robohash.org/L9Z.png?set=set4',
};
