import { validateUserForm } from '../utils';

describe('validateUserForm', () => {
	it('should return null if value is valid for given field name', () => {
		expect(validateUserForm('test', 'username')).toBeNull();
		expect(validateUserForm('test@test.test', 'email')).toBeNull();
		expect(validateUserForm('test', 'name')).toBeNull();
	});

	it('should return error message if value is too short for given field name', () => {
		expect(validateUserForm('te', 'username')).not.toBeNull();
	});

	it('should return error message if value is too long for given field name', () => {
		const value = 't'.repeat(40);

		expect(validateUserForm(value, 'username')).not.toBeNull();
	});

	it('should return error message if value is not a valid email for email field', () => {
		expect(validateUserForm('test', 'email')).toEqual('Invalid email');
	});
});
