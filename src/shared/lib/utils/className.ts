/** Basic type */
type ClassNameTypes = boolean | string | number | null | undefined;
/** Basic type for object */
type ClassNameObjectType = Record<string, ClassNameTypes>;
/** A type with arguments that the function accepts */
type ClassNameArgs = ClassNameTypes | ClassNameTypes[] | ClassNameObjectType;

/**
 * A function for joining class names
 *
 * @param args Strings, booleans, arrays, or objects that need to be joined
 *
 * @returns A string with joined classnames
 */
export const cl = (...args: ClassNameArgs[]): string => {
	const classNames: ClassNameTypes[] = [];

	args.forEach((arg) => {
		if (!arg) {
			return;
		}

		if (typeof arg === 'string' || typeof arg === 'number') {
			classNames.push(arg);
			return;
		}

		if (Array.isArray(arg)) {
			classNames.push(cl(...arg));
			return;
		}

		if (typeof arg === 'object') {
			for (const className in arg) {
				if (Object.prototype.hasOwnProperty.call(arg, className) && arg[className]) {
					classNames.push(className);
				}
			}

			return;
		}
	});

	return classNames.join(' ');
};
