import { fireEvent, render, screen } from '@testing-library/react';

import { useHorizontalResize } from '../useHorizontalResize';

const DEFAULT_WIDTH = 100;

const WrapperComponent = () => {
	const { refContainer, refResizer, isDraggable } = useHorizontalResize();

	return (
		<div ref={refContainer} style={{ width: DEFAULT_WIDTH }} data-testid='wrapper'>
			Test
			<div ref={refResizer} data-testid='resizer'></div>
			{isDraggable ? <div data-testid='backdrop'></div> : null}
		</div>
	);
};

describe('useHorizontalResize', () => {
	it('should resizing container work correctly', () => {
		const CLIENT_X_MOVE = 150;

		render(<WrapperComponent />);

		const wrapperElement = screen.getByTestId('wrapper');
		const resizerElement = screen.getByTestId('resizer');

		fireEvent.mouseDown(resizerElement);
		fireEvent.mouseMove(resizerElement, {
			clientX: CLIENT_X_MOVE,
		});
		fireEvent.mouseUp(resizerElement);

		expect(wrapperElement).toHaveStyle(`width: ${DEFAULT_WIDTH + CLIENT_X_MOVE}px;`);
	});

	it('should not change the container width if it has gone beyond the max-width', () => {
		const CLIENT_X_MOVE = 800;

		render(<WrapperComponent />);

		const wrapperElement = screen.getByTestId('wrapper');
		const resizerElement = screen.getByTestId('resizer');

		fireEvent.mouseDown(resizerElement);
		fireEvent.mouseMove(resizerElement, {
			clientX: CLIENT_X_MOVE,
		});
		fireEvent.mouseUp(resizerElement);

		expect(wrapperElement).toHaveStyle(`width: ${DEFAULT_WIDTH}px;`);
	});

	it('should not change the container width if it has gone beyond the min-width', () => {
		const CLIENT_X_MOVE = -200;

		render(<WrapperComponent />);

		const wrapperElement = screen.getByTestId('wrapper');
		const resizerElement = screen.getByTestId('resizer');

		fireEvent.mouseDown(resizerElement);
		fireEvent.mouseMove(resizerElement, {
			clientX: CLIENT_X_MOVE,
		});
		fireEvent.mouseUp(resizerElement);

		expect(wrapperElement).toHaveStyle(`width: ${DEFAULT_WIDTH}px;`);
	});

	it('should show the backdrop when mouse moving', async () => {
		const CLIENT_X_MOVE = 100;

		render(<WrapperComponent />);

		const resizerElement = screen.getByTestId('resizer');

		expect(screen.queryByTestId('backdrop')).not.toBeInTheDocument();

		fireEvent.mouseDown(resizerElement);
		fireEvent.mouseMove(resizerElement, {
			clientX: CLIENT_X_MOVE,
		});

		const backdropElement = screen.getByTestId('backdrop');

		expect(backdropElement).toBeInTheDocument();

		fireEvent.mouseUp(resizerElement);

		expect(backdropElement).not.toBeInTheDocument();
	});
});
