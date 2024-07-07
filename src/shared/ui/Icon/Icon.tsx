import { SVGProps } from 'react';

import { cl } from '../../lib/utils';

import { IconTypes } from './types';

interface IIconProps extends SVGProps<SVGSVGElement> {
	/** Name of the icon displayed */
	name: IconTypes;
	/** Width and height of the icon
	 *
	 *  @default 16
	 */
	size?: number;
}

/** This component is a basic svg icon. */
export const Icon = ({ name, size = 16, className = '', ...rest }: IIconProps) => (
	<svg
		className={cl(`icon icon-${name}`, className, {
			filled: name.includes('filled'),
		})}
		width={size}
		height={size}
		data-testid='icon'
		{...rest}
	>
		<use xlinkHref={`/images/icons.svg#${name}`} />
	</svg>
);
