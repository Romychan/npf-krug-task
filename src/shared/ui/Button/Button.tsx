import { ButtonHTMLAttributes, ReactNode } from 'react';

import { SizeTypes } from '../../lib/types/ui';
import { cl } from '../../lib/utils';

import styles from './Button.module.scss';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** The content of the component */
	children?: ReactNode;
	/** If `true`, the button with icon will have the same width and height */
	isIconOnly?: boolean;
	/**
	 * The variant of the component
	 *
	 * @default 'filled'
	 */
	variant?: 'filled' | 'ghost' | 'bordered' | 'light' | 'link' | 'flat';
	/**
	 * The size of the component
	 *
	 * @default 'md'
	 */
	size?: SizeTypes;
	/**
	 * The color of the component
	 *
	 * @default 'default'
	 */
	color?: 'default' | 'primary' | 'success' | 'danger' | 'warning';
}

/** This component is used to trigger an action or event when click on it */
export const Button = ({
	variant = 'filled',
	color = 'default',
	size = 'md',
	type = 'button',
	isIconOnly,
	className = '',
	children,
	...rest
}: IButtonProps) => {
	return (
		<button
			type={type}
			className={cl(styles.button, className, styles[variant], styles[color], styles[size], {
				[styles.icon]: isIconOnly,
			})}
			{...rest}
		>
			{children}
		</button>
	);
};
