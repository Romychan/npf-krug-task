import { ReactNode, useState } from 'react';

import { cl } from '../../lib/utils';
import { VariantTypes } from '../../lib/types/ui';
import { useEventListener } from '../../lib/hooks';
import { Button } from '../Button';
import { Icon } from '../Icon';

import styles from './Drawer.module.scss';

export interface IDrawerProps {
	/** Header title of the drawer */
	title?: string;
	/** Header description of the drawer */
	description?: string;
	/** The callback that will be called when the drawer is closed */
	onClose: () => void;
	/** If `true`, the drawer will close when clicked on the backdrop */
	closeOnBackdropClick?: boolean;
	/** Additional class for the component */
	className?: string;
	/**
	 * The content of the component
	 *
	 * @param onClose A callback to close the drawer
	 */
	children: ReactNode | ((onClose: () => void) => ReactNode);
	/**
	 * If `true`, the drawer will be open.
	 *
	 * @default false
	 */
	isVisible: boolean;
	/**
	 * The side from which the drawer will appear.
	 *
	 * @default 'center'
	 */
	position?: 'left' | 'right' | 'center';
	/**
	 * Component backdrop style
	 *
	 * @default 'filled'
	 */
	backdrop?: Extract<VariantTypes, 'filled'> | 'transparent';
}

/** This component is used to display a dialog window. */
export const Drawer = ({
	isVisible = false,
	title,
	description,
	children,
	onClose,
	closeOnBackdropClick = true,
	position = 'center',
	backdrop = 'filled',
	className = '',
}: IDrawerProps) => {
	const [isFadeOut, setIsFadeOut] = useState(false);

	const handleClose = () => {
		setIsFadeOut(true);
	};

	const handleAnimationEnd = () => {
		if (isFadeOut) {
			setIsFadeOut(false);
			onClose();
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && isVisible) {
			handleClose();
		}
	};

	useEventListener('keydown', handleKeyDown);

	if (!isVisible) return null;

	return (
		<>
			<div
				className={cl(styles.backdrop, styles[position], styles[backdrop], {
					[styles.hidden]: isFadeOut,
				})}
				onClick={closeOnBackdropClick ? handleClose : undefined}
				onAnimationEnd={handleAnimationEnd}
				data-testid='drawer-backdrop'
			></div>
			<div
				className={cl(styles.container, styles[position], className, {
					[styles.hidden]: isFadeOut,
				})}
				data-testid='drawer'
			>
				<div className={styles.header}>
					<div className={styles.information}>
						<h3 className={styles.title}>{title}</h3>
						<p className={styles.description}>{description}</p>
					</div>

					<Button
						color='primary'
						variant='light'
						size='sm'
						isIconOnly
						onClick={handleClose}
						aria-label='Close the modal window'
						title='Close'
						data-testid='drawer-close'
					>
						<Icon name='close' />
					</Button>
				</div>

				<div className={styles.body}>
					<div className={styles.content}>{typeof children === 'function' ? children(handleClose) : children}</div>
				</div>
			</div>
		</>
	);
};
