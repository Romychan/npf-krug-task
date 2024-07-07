import { useCallback, useEffect, useRef, useState } from 'react';

import { cl } from '../../../lib/utils';
import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { useToast } from '../hooks';
import { ToastType } from '../types';

import styles from './Toast.module.scss';

/** This component is used to display toast notifications or messages. */
export const Toast = ({ id, type, variant = 'bordered', title, text, duration = 2000 }: ToastType) => {
	const { deleteToast } = useToast();
	const [isFadeOut, setIsFadeOut] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const progressRef = useRef<HTMLDivElement>(null);

	const handleTransitionEnd = () => {
		if (isFadeOut) {
			deleteToast({ id });
		}
	};

	const handleClose = useCallback(() => {
		setIsFadeOut(true);
	}, []);

	const handleMouseEnter = () => {
		if (!progressRef.current || !timerRef.current || !duration) return;

		clearTimeout(timerRef.current);
		progressRef.current.style.animationPlayState = 'paused';
	};

	const handleMouseLeave = () => {
		if (!progressRef.current || !duration) return;

		const barWidth = progressRef.current?.offsetWidth;
		const parentWidth = progressRef.current?.parentElement?.offsetWidth || 0;
		const delay = (barWidth / parentWidth) * duration;

		timerRef.current = setTimeout(() => {
			handleClose();
		}, delay);

		progressRef.current.style.animationPlayState = 'running';
	};

	useEffect(() => {
		if (!duration) return;

		timerRef.current = setTimeout(() => {
			handleClose();
		}, duration);

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onTouchMove={handleMouseEnter}
			onTouchEnd={handleMouseLeave}
			onTransitionEnd={handleTransitionEnd}
			className={cl(styles.toast, styles[variant], styles[type], {
				[styles.hidden]: isFadeOut,
			})}
			data-testid='toast'
		>
			<div className={styles.container}>
				<div className={styles.content}>
					<Icon name={`${type}-filled`} size={24} className={styles.status} />
					<div className={styles.information}>
						<span className={styles.title}>{title}</span>
						<span className={styles.text}>{text}</span>
					</div>
				</div>

				<Button
					size='xs'
					isIconOnly
					variant='light'
					color='primary'
					onClick={handleClose}
					className={styles.close}
					data-testid='toast-close'
				>
					<Icon name='close' />
				</Button>
			</div>

			<div ref={progressRef} className={styles.bar} style={{ animationDuration: `${duration}ms` }} />
			<div className={styles.background}></div>
		</div>
	);
};
