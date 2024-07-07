import { ReactNode } from 'react';

import { cl } from '../../lib/utils';

import styles from './FormControl.module.scss';

interface IFormControlProps {
	/** The label of the children component */
	label: string;
	/** The content of the component */
	children: ReactNode;
	/** Error message to display */
	error?: string;
	/** Additional class for the component */
	className?: string;
	/** ID for linking a label to a form element */
	labelId?: string;
	/** If `true`, the label will indicate that the input is required */
	required?: boolean;
	/**
	 * The variant of the component
	 *
	 * @default 'primary'
	 */
	variant?: 'primary' | 'secondary';
	/**
	 * Label position relative to children
	 *
	 * @default 'top'
	 */
	labelPosition?: 'left' | 'right' | 'top';
}

/** This component is used to display the label and error with the form element */
export const FormControl = ({
	label,
	error,
	className,
	variant = 'primary',
	labelPosition = 'top',
	labelId,
	required,
	children,
}: IFormControlProps) => {
	return (
		<div className={cl(styles.container, className, styles[variant], styles[labelPosition])}>
			<label className={styles.label} htmlFor={labelId}>
				{label}
				{required ? <span className={styles.required}>*</span> : null}
			</label>
			<div className={styles.content}>
				{children}
				{error ? (
					<span className={styles.error} role='alert'>
						{error}
					</span>
				) : null}
			</div>
		</div>
	);
};
