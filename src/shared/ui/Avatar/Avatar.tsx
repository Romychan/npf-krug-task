import { ImgHTMLAttributes, useState } from 'react';

import { cl } from '../../lib/utils';
import { SizeTypes } from '../../lib/types/ui';

import styles from './Avatar.module.scss';

interface IAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
	/** Text to display if the `src` image is missing or cannot be loaded. Displays the first three characters */
	name: string;
	/**
	 * If `true`, adds a border around the component
	 *
	 * @default false
	 * */
	isBordered?: boolean;
	/**
	 * The size of the component
	 *
	 * @default 'md'
	 */
	size?: SizeTypes;
	/**
	 * The border radius of the component
	 *
	 * @default 'auto'
	 */
	radius?: 'auto' | 'rounded' | 'none';
}

/** This component is used to display the user's avatar */
export const Avatar = ({
	src,
	name,
	isBordered = false,
	size = 'md',
	radius = 'auto',
	className,
	...rest
}: IAvatarProps) => {
	const [isError, setIsError] = useState(false);

	return (
		<div
			className={cl(styles.container, styles[size], styles[radius], className, {
				[styles.border]: isBordered,
				[styles.error]: isError,
			})}
			data-testid='avatar'
		>
			<img {...rest} className={styles.image} src={src} onError={() => setIsError(true)} />

			{isError ? (
				<span className={styles.placeholder} data-testid='avatar-text'>
					{name.slice(0, 3)}
				</span>
			) : null}
		</div>
	);
};
