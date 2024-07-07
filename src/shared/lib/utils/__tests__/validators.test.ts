import { isValidEmail, maxLength, minLength, required, validate, ValidatorResult } from '../validators';

describe('validate', () => {
	it('should return null if value passes all validators', () => {
		const validators = [required(), minLength(3), maxLength(10)];

		expect(validate('hello', validators)).toBeNull();
		expect(validate('12345', validators)).toBeNull();
	});

	it('should return error message from first failed validator', () => {
		const validators = [required(), minLength(3), maxLength(10)];

		expect(validate('', validators)).toEqual('This field is required');
	});

	it('should return error message from last failed validator', () => {
		const validators = [required(), minLength(3), maxLength(10)];

		expect(validate('hello world!!!!!!!', validators)).toEqual('The maximum number of characters is 10');
	});

	it('should handle null values correctly', () => {
		const validators = [required(), minLength(5), maxLength(10), isValidEmail()];

		expect(validate(null as unknown as string, validators)).toEqual('This field is required');
	});

	it('should handle empty validator arrays correctly', () => {
		const validators: ValidatorResult<string>[] = [];

		expect(validate('test', validators)).toBeNull();
	});
});

describe('minLength', () => {
	it('should return null if value meets minimum length', () => {
		const validator = minLength(5);

		expect(validator('hello')).toBeNull();
		expect(validator('1234567890')).toBeNull();
	});

	it('should return error message if value is shorter than minimum length', () => {
		const validator = minLength(5);

		expect(validator('hi')).toEqual('The minimum number of characters is 5');
		expect(validator('1234')).toEqual('The minimum number of characters is 5');
		expect(validator('')).toEqual('The minimum number of characters is 5');
	});

	it('should not allow negative minimum length', () => {
		expect(() => minLength(-1)).toThrow();
	});

	it('should handle null values correctly', () => {
		expect(() => minLength(null as unknown as number)).toThrow();
	});
});

describe('maxLength', () => {
	it('should return null if value meets maximum length', () => {
		const validator = maxLength(5);

		expect(validator('hello')).toBeNull();
		expect(validator('123')).toBeNull();
		expect(validator('')).toBeNull();
	});

	it('should return error message if value is longer than maximum length', () => {
		const validator = maxLength(5);

		expect(validator('hello world')).toEqual('The maximum number of characters is 5');
		expect(validator('1234567')).toEqual('The maximum number of characters is 5');
	});

	it('should not allow negative maximum length', () => {
		expect(() => maxLength(-1)).toThrow();
	});

	it('should handle null values correctly', () => {
		expect(() => maxLength(null as unknown as number)).toThrow();
	});
});

describe('required', () => {
	it('should return null if value is not empty', () => {
		const validator = required();

		expect(validator('hello')).toBeNull();
	});

	it('should return error message if value is empty', () => {
		const validator = required();

		expect(validator('')).toEqual('This field is required');
		expect(validator('   ')).toEqual('This field is required');
	});

	it('should return error message with custom message', () => {
		const validator = required('Test');

		expect(validator('')).toEqual('Test');
	});

	it('should handle null values correctly', () => {
		const validator = required();

		expect(validator(null as unknown as string)).toEqual('This field is required');
	});
});

describe('isValidEmail', () => {
	it('should return null if value is a valid email address', () => {
		const validator = isValidEmail();

		expect(validator('test@test.test')).toBeNull();
		expect(validator(' test@test.test ')).toBeNull();
	});

	it('should return error message if value is not a valid email address', () => {
		const validator = isValidEmail();

		expect(validator('test@123')).toEqual('Invalid email');
		expect(validator('123')).toEqual('Invalid email');
		expect(validator('@test.test')).toEqual('Invalid email');
		expect(validator('')).toEqual('Invalid email');
	});

	it('should return error message with custom message', () => {
		const validator = isValidEmail('Test');

		expect(validator('test@123')).toEqual('Test');
	});

	it('should handle null values correctly', () => {
		const validator = isValidEmail();

		expect(validator(null as unknown as string)).toEqual('Invalid email');
	});
});
