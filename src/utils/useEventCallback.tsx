import { useCallback, useRef } from "react";

export default function useEventCallback<T extends Array<unknown>, R>(
	fn: (...args: T) => R
) {
	const ref = useRef(fn);
	ref.current = fn;

	return useCallback((...args: T) => {
		const fn = ref.current;
		return fn(...args);
	}, []);
}
