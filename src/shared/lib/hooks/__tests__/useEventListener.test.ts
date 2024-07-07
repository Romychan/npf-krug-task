import { MockInstance, vi } from 'vitest';
import { renderHook, fireEvent } from '@testing-library/react';
import { MutableRefObject } from 'react';

import { useEventListener } from '../useEventListener';

describe('useEventListener', () => {
	describe('Ref is passed as a parameter', () => {
		let ref: MutableRefObject<HTMLDivElement>;
		let addEventListenerSpy: MockInstance;
		let removeEventListenerSpy: MockInstance;

		beforeEach(() => {
			ref = { current: document.createElement('div') };
			addEventListenerSpy = vi.spyOn(ref.current, 'addEventListener');
			removeEventListenerSpy = vi.spyOn(ref.current, 'removeEventListener');
		});

		it('should call addEventListener', () => {
			const clickHandle = vi.fn();

			renderHook(() => useEventListener('click', clickHandle, ref));

			expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
			expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), undefined);
		});

		it('should call removeEventListener after unmounting', () => {
			const clickHandle = vi.fn();

			const { unmount } = renderHook(() => useEventListener('click', clickHandle, ref));

			unmount();

			expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), undefined);
		});

		it('should call the passed callback when the event is triggered', () => {
			const clickHandle = vi.fn();

			renderHook(() => useEventListener('click', clickHandle, ref));

			fireEvent.click(ref.current);

			expect(clickHandle).toHaveBeenCalledTimes(1);
			expect(clickHandle).toHaveBeenCalledWith(expect.any(MouseEvent));
		});
	});

	describe('Ref is not passed as a parameter', () => {
		let documentAddEventListenerSpy: MockInstance;
		let documentRemoveEventListenerSpy: MockInstance;

		beforeEach(() => {
			documentAddEventListenerSpy = vi.spyOn(document, 'addEventListener');
			documentRemoveEventListenerSpy = vi.spyOn(document, 'removeEventListener');
		});

		it('should call addEventListener', () => {
			const clickHandle = vi.fn();

			renderHook(() => useEventListener('click', clickHandle));

			expect(documentAddEventListenerSpy).toHaveBeenCalledTimes(1);
			expect(documentAddEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), undefined);
		});

		it('should call removeEventListener after unmounting', () => {
			const clickHandle = vi.fn();

			const { unmount } = renderHook(() => useEventListener('click', clickHandle));

			unmount();

			expect(documentRemoveEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), undefined);
		});

		it('should call the passed callback when the event is triggered', () => {
			const clickHandle = vi.fn();

			renderHook(() => useEventListener('click', clickHandle));

			fireEvent.click(document);

			expect(clickHandle).toHaveBeenCalledTimes(1);
			expect(clickHandle).toHaveBeenCalledWith(expect.any(MouseEvent));
		});
	});
});
