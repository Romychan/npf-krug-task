import { useState, useCallback } from 'react';

interface IToggleResult {
	/** The current state of the toggle */
	isToggled: boolean;
	/** A function for toggle the state */
	onToggle: () => void;
}

/**
 * This hook is used to toggle the boolean value
 *
 * @param initialValue The initial value of the toggle state
 *
 * @returns Object with elements to control the state
 */
export const useToggle = (initialValue?: boolean): IToggleResult => {
	const [isToggled, setIsToggled] = useState(!!initialValue);

	const onToggle = useCallback(() => {
		setIsToggled((prev) => !prev);
	}, []);

	return { isToggled, onToggle };
};
