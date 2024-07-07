import { required, minLength, maxLength, validate, isValidEmail } from '~/shared/lib/utils';

import { UserForm } from '../model/types';

/**
 * Validates the value of a custom form field based on the field name
 *
 * @param value The value of the user form field to validate
 * @param name The name of the user form field to validate
 *
 * @returns A validation error message or null if the value is valid
 */
export const validateUserForm = (value: string, name: keyof UserForm) => {
	const validators = [required(), minLength(3), maxLength(32)];

	if (name === 'email') {
		validators.push(isValidEmail());
	}

	return validate(value, validators);
};
