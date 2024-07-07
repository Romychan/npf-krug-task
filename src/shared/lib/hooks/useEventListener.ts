import { useRef, useEffect, RefObject } from 'react';

/**
 * This hook is designed to add an event listener when mounting a component and remove the listener when unmounting a component
 *
 * @template K A type with a set of events that can occur in a document
 * @template T The interface of the element to add an event listener to
 *
 * @param eventName The name of the event to listen to
 * @param callback The callback that will be called when handling the event
 * @param element The `ref` element to add an event listener to. If the element is not specified, the event listener will be added to the `document`
 * @param options An object that sets additional parameters for the event listener
 */
export const useEventListener = <K extends keyof DocumentEventMap, T extends HTMLElement = HTMLDivElement>(
	eventName: K,
	callback: (event: DocumentEventMap[K]) => void,
	element?: RefObject<T>,
	options?: AddEventListenerOptions,
) => {
	const savedCallback = useRef(callback);

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		const currentTarget = element?.current ?? document;
		const isSupported = currentTarget && currentTarget.addEventListener;

		if (!isSupported) return;

		const eventListener = (event: Event) => {
			savedCallback.current(event as DocumentEventMap[K]);
		};

		currentTarget.addEventListener(eventName, eventListener, options);

		return () => {
			currentTarget.removeEventListener(eventName, eventListener, options);
		};
	}, [eventName, element, options]);
};
