/** A type representing the possible return values of a validator function */
type ValidatorReturnResult = string | null;
/**
 * A type representing a validator function that takes a single parameter and returns a `ValidatorReturnResult`
 *
 * @template T The type of the parameter to the validator function.
 */
export type ValidatorResult<T> = (value: T) => ValidatorReturnResult;
/**
 * A type representing a function that returns a validation function
 *
 * @template T The type of the options parameter for the function that returns the validation function
 * @template K The type of the parameter to the validator function returned by the function that returns a validator function
 */
export type Validator<T, K> = (options?: T) => ValidatorResult<K>;

/**
 * A function that validates a value using an array of validator functions
 *
 * @param value The value to validate
 * @param validators An array of validator functions to use for validation
 *
 * @returns The first error message returned by a validator function, or null if all validators pass
 */
export const validate = <T>(value: T, validators: ValidatorResult<T>[]): ValidatorReturnResult => {
	let validationResult: ValidatorReturnResult = null;

	for (const validator of validators) {
		const result = validator(value);

		if (result) {
			validationResult = result;
			break;
		}
	}

	return validationResult;
};

/**
 * A validator function that checks if a string is not empty
 *
 * @param message The error message to display if the field is empty
 *
 * @returns A function that takes a string and returns an error message if the string is empty, or null if it is not
 */
export const required: Validator<string, string> = (message = 'This field is required') => {
	return (value) => (value && value.trim() ? null : message);
};

/**
 * A validator function that checks if a string has a minimum length
 *
 * @param minCharLength - The minimum number of characters allowed in the string
 *
 * @returns A function that takes a string and returns an error message if the string is too short, or null if it is not
 */
export const minLength: Validator<number, string> = (minCharLength = 2) => {
	if (minCharLength < 0 || !minCharLength) {
		throw new Error();
	}

	return (value) => (value.length >= minCharLength ? null : `The minimum number of characters is ${minCharLength}`);
};

/**
 * A validator function that checks if a string has a maximum length
 *
 * @param maxCharLength The maximum number of characters allowed in the string
 *
 * @returns A function that takes a string and returns an error message if the string is too long, or null if it is not
 */
export const maxLength: Validator<number, string> = (maxCharLength = 16) => {
	if (maxCharLength < 0 || !maxCharLength) {
		throw new Error();
	}

	return (value) => (value.length <= maxCharLength ? null : `The maximum number of characters is ${maxCharLength}`);
};

/**
 * A validator function that checks if a string is a valid email address
 * @param message The error message to display if the email is invalid
 *
 * @returns A function that takes a string and returns an error message if the string is not a valid email address, or null if it is
 */
export const isValidEmail: Validator<string, string> = (message = 'Invalid email') => {
	const validateEmailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

	return (value) => (value && validateEmailRegex.test(value.trim()) ? null : message);
};
