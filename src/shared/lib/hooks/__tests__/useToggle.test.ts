import { act, renderHook } from '@testing-library/react';

import { useToggle } from '../useToggle';

describe('useToggle', () => {
	it('should apply the initial default value if it is not specified', () => {
		const { result } = renderHook(() => useToggle());
		const { isToggled } = result.current;

		expect(isToggled).toBe(false);
	});

	it('should apply the initial value if it is specified', () => {
		const { result } = renderHook(() => useToggle(true));
		const { isToggled } = result.current;

		expect(isToggled).toBe(true);
	});

	it('should toggle values correctly', () => {
		const { result } = renderHook(() => useToggle());
		const { onToggle } = result.current;

		expect(result.current.isToggled).toBe(false);

		act(() => onToggle());

		expect(result.current.isToggled).toBe(true);

		act(() => onToggle());

		expect(result.current.isToggled).toBe(false);
	});

	it('should toggle values correctly with initial values', () => {
		const { result } = renderHook(() => useToggle(true));
		const { onToggle } = result.current;

		expect(result.current.isToggled).toBe(true);

		act(() => onToggle());

		expect(result.current.isToggled).toBe(false);

		act(() => onToggle());

		expect(result.current.isToggled).toBe(true);
	});
});
