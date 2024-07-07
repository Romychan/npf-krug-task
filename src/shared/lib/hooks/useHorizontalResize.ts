import { useState, useCallback, useRef, RefObject } from 'react';

import { useEventListener } from './useEventListener';

/**
 * The interface of the returned result
 *
 * @template T The interface of the element whose width will change
 */
interface HorizontalResizeResult<T> {
	/** Whether the width is currently changing */
	isDraggable: boolean;
	/** Ref for the container element that should change its width */
	refContainer: RefObject<T>;
	/** Ref for the element that should change the width of the container */
	refResizer: RefObject<HTMLDivElement>;
}

/**
 * This hook is designed to change the width of the element horizontally
 *
 * @template T The interface of the element whose width will change
 *
 * @param minWidth Minimum width for the component
 * @param maxWidth Maximum width for the component
 *
 * @returns An object for controlling the width change
 */
export const useHorizontalResize = <T extends HTMLElement = HTMLDivElement>(
	minWidth = 100,
	maxWidth = 500,
): HorizontalResizeResult<T> => {
	const refContainer = useRef<T>(null);
	const refResizer = useRef<HTMLDivElement>(null);

	const [isDraggable, setIsDraggable] = useState(false);

	const handleMouseDownResize = useCallback(
		(event: MouseEvent) => {
			if (!refContainer.current || !refResizer.current) return;

			const styles = window.getComputedStyle(refContainer.current);
			let width = parseInt(styles.width, 10);
			let x = event.clientX;

			setIsDraggable(true);

			const handleMouseMoveResize = (event: MouseEvent) => {
				const dx = event.clientX - x;

				if (width + dx < maxWidth && width + dx > minWidth) {
					x = event.clientX;
					width = width + dx;
					refContainer.current!.style.width = `${width}px`;
				}
			};

			const handleMouseUpResize = () => {
				setIsDraggable(false);

				document.removeEventListener('mousemove', handleMouseMoveResize);
				document.removeEventListener('mouseup', handleMouseUpResize);
			};

			document.addEventListener('mousemove', handleMouseMoveResize);
			document.addEventListener('mouseup', handleMouseUpResize);
		},
		[maxWidth, minWidth],
	);

	const handleTouchStartResize = useCallback(
		(event: TouchEvent) => {
			if (!refContainer.current || !refResizer.current) return;

			const touch = event.touches[0];
			const styles = window.getComputedStyle(refContainer.current);
			let width = parseInt(styles.width, 10);
			let x = touch.clientX;

			setIsDraggable(true);

			const handleTouchMoveResize = (event: TouchEvent) => {
				const touch = event.touches[0];
				const dx = touch.clientX - x;

				if (width + dx < maxWidth && width + dx > minWidth) {
					x = touch.clientX;
					width = width + dx;
					refContainer.current!.style.width = `${width}px`;
				}
			};

			const handleTouchEndResize = () => {
				setIsDraggable(false);

				document.removeEventListener('touchmove', handleTouchMoveResize);
				document.removeEventListener('touchend', handleTouchEndResize);
			};

			document.addEventListener('touchmove', handleTouchMoveResize);
			document.addEventListener('touchend', handleTouchEndResize);
		},
		[maxWidth, minWidth],
	);

	useEventListener('mousedown', handleMouseDownResize, refResizer);
	useEventListener('touchstart', handleTouchStartResize, refResizer, {
		passive: true,
	});

	return {
		isDraggable,
		refContainer,
		refResizer,
	};
};
