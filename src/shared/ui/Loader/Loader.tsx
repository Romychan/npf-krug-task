import { HTMLAttributes } from 'react';

import { cl } from '../../lib/utils';

import styles from './Loader.module.scss';

interface ILoaderProps extends HTMLAttributes<HTMLDivElement> {}

/** This component shows that the content is being loaded or processed. */
export const Loader = ({ className, ...rest }: ILoaderProps) => {
	return (
		<span
			{...rest}
			className={cl(styles.loader, className)}
			role='progressbar'
			aria-live='polite'
			aria-label='Loading'
			data-testid='loader'
		></span>
	);
};
