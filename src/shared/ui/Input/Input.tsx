import { InputHTMLAttributes } from 'react';

import { cl } from '../../lib/utils';
import { SizeTypes, VariantTypes } from '../../lib/types/ui';

import styles from './Input.module.scss';

export interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	/** If `true`, the input will indicate an error */
	error?: boolean | string;
	/**
	 * The variant of the component
	 *
	 * @default 'bordered'
	 */
	variant?: VariantTypes;
	/**
	 * The size of the component
	 *
	 * @default 'md'
	 */
	size?: SizeTypes;
}

/** This component is used to enter short texts in a text field. */
export const Input = ({
	value,
	variant = 'bordered',
	autoComplete = 'off',
	error,
	className = '',
	type = 'text',
	size = 'md',
	...rest
}: IInputProps) => (
	<input
		type={type}
		value={value}
		className={cl(styles.input, styles[variant], styles[size], className, {
			[styles.error]: error,
		})}
		autoComplete={autoComplete}
		data-testid='input-field'
		{...rest}
	/>
);
