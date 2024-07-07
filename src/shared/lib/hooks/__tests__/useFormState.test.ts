import { act, renderHook } from '@testing-library/react';
import { ChangeEvent, FormEvent } from 'react';
import { vi } from 'vitest';

import { useFormState } from '../useFormState';

const MOCK_FIELD = { username: '' };

const MOCK_VALIDATE = (value: string) => {
	if (value.length <= 3) return 'Error Field';

	return '';
};

const MOCK_TARGET_EVENT = {
	target: {
		name: 'username',
		value: 'test',
	},
} as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const MOCK_ERROR_TARGET_EVENT = {
	target: {
		name: 'username',
		value: 't',
	},
} as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

describe('useFormState', () => {
	describe('handleChange', () => {
		it('should update form state when input changes', () => {
			const { result } = renderHook(() => useFormState(MOCK_FIELD));

			expect(result.current.values.username).toEqual('');

			act(() => {
				result.current.handleChange(MOCK_TARGET_EVENT);
			});

			expect(result.current.values.username).toEqual('test');
		});

		it('should validate form state when validate callback is called', () => {
			const { result } = renderHook(() => useFormState(MOCK_FIELD, MOCK_VALIDATE));

			act(() => {
				result.current.handleChange(MOCK_ERROR_TARGET_EVENT);
			});

			expect(result.current.errors.username).toEqual('Error Field');

			act(() => {
				result.current.handleChange(MOCK_TARGET_EVENT);
			});

			expect(result.current.errors.username).toEqual('');
		});
	});

	describe('handleSubmit', () => {
		it('should call handleSubmit with form values when form is submitted', () => {
			const mockSubmit = vi.fn();
			const submitTarget = {
				preventDefault: vi.fn() as () => void,
			} as FormEvent<HTMLFormElement>;

			const { result } = renderHook(() => useFormState(MOCK_FIELD));

			act(() => {
				result.current.handleChange(MOCK_TARGET_EVENT);
			});

			result.current.handleSubmit(mockSubmit)(submitTarget);

			expect(mockSubmit).toHaveBeenCalledWith({ username: 'test' });
		});

		it('should not call handleSubmit callback when form is invalid', () => {
			const mockSubmit = vi.fn();
			const submitTarget = {
				preventDefault: vi.fn() as () => void,
			} as FormEvent<HTMLFormElement>;

			const { result } = renderHook(() => useFormState(MOCK_FIELD, MOCK_VALIDATE));

			act(() => {
				result.current.handleChange(MOCK_ERROR_TARGET_EVENT);
				result.current.handleSubmit(mockSubmit)(submitTarget);
			});

			act(() => {
				result.current.handleSubmit(mockSubmit)(submitTarget);
			});

			expect(mockSubmit).not.toHaveBeenCalled();
		});

		it('should reject invalid form data and accept valid form data', () => {
			const mockSubmit = vi.fn();
			const submitTarget = {
				preventDefault: vi.fn() as () => void,
			} as FormEvent<HTMLFormElement>;

			const { result } = renderHook(() => useFormState(MOCK_FIELD, MOCK_VALIDATE));

			act(() => {
				result.current.handleChange(MOCK_ERROR_TARGET_EVENT);
			});

			act(() => {
				result.current.handleSubmit(mockSubmit)(submitTarget);
			});

			expect(mockSubmit).not.toHaveBeenCalled();
			expect(result.current.errors.username).toEqual('Error Field');

			act(() => {
				result.current.handleChange(MOCK_TARGET_EVENT);
			});

			act(() => {
				result.current.handleSubmit(mockSubmit)(submitTarget);
			});

			expect(mockSubmit).toHaveBeenCalledWith({ username: 'test' });
			expect(result.current.errors.username).toBeUndefined();
		});
	});
});
