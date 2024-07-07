import { useState, ChangeEvent, FormEvent } from 'react';

/**
 * The type representing the error object returned by the 'useFormState` hook.
 *
 * @template T The type of the form values
 */
type FormErrors<T> = {
	[K in keyof T]?: string;
};

/**
 * The return type of the `useFormState` hook
 *
 * @template T The type of the form values
 */
type UseFormStateReturn<T> = {
	/** The current values of the form */
	values: T;
	/** An object containing error messages for invalid fields */
	errors: FormErrors<T>;
	/** The callback to handle changes to form fields */
	handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	/**
	 * A callback that handles the submission of the form
	 *
	 * @param callback The callback that will be called when form is submitted
	 *
	 * @returns A callback that accepts the form submission event and prevents the form from being submitted by default
	 */
	handleSubmit: (callback: (values: T) => void) => (event: FormEvent<HTMLFormElement>) => void;
};

/**
 * This hook is designed to control the form state
 *
 * @template T The type of the form values
 *
 * @param initialValues The initial values for the form
 * @param validate The validation function for form values. It takes the name of the field and its value and returns an error message or undefined if the value is valid
 *
 * @returns An object for controlling the form state
 */
export const useFormState = <T>(
	initialValues: T,
	validate?: (value: T[keyof T], name: keyof T) => string | null,
): UseFormStateReturn<T> => {
	const [values, setValues] = useState<T>(initialValues);
	const [errors, setErrors] = useState<FormErrors<T>>({});

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const name = event.target.name as keyof T;
		const value = event.target.value as T[keyof T];

		setValues((values) => ({ ...values, [name]: value }));

		if (validate) {
			setErrors((errors) => ({
				...errors,
				[name]: validate(value, name),
			}));
		}
	};

	const handleError = (callback: (values: T) => void) => {
		const fieldErrors: FormErrors<T> = {};

		for (const fieldName in values) {
			const isError = validate!(values[fieldName], fieldName);

			if (isError) {
				fieldErrors[fieldName] = isError;
			}
		}

		setErrors(fieldErrors);

		if (Object.keys(fieldErrors).length === 0) {
			callback(values);
		}
	};

	const handleSubmit = (callback: (values: T) => void) => (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (validate) {
			handleError(callback);
		} else {
			callback(values);
		}
	};

	return {
		values,
		errors,
		handleChange,
		handleSubmit,
	};
};
