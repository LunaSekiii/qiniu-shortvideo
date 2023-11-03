/**
 * 节流
 */
function throttle<T extends Array<unknown>, R>(
	fn: (...args: T) => R,
	delay = 100
) {
	let timer: NodeJS.Timeout | null = null;

	return (...args: T) => {
		if (timer) {
			return false;
		}
		fn(...args);
		timer = setTimeout(() => {
			timer = null;
		}, delay);
	};
}

export default throttle;
