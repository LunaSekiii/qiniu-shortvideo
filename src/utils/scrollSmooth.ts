/**
 * 使用requestAnimationFrame实现平滑滚动(easeOut)
 */
function scrollBySmooth(
	target: HTMLElement,
	x: number,
	y: number,
	duration = 500
) {
	const startTime = performance.now();
	const startX = target.scrollLeft;
	const startY = target.scrollTop;

	function scrollStep(timestamp: DOMHighResTimeStamp) {
		const elapsed = timestamp - startTime;
		const progress = Math.min(elapsed / duration, 1); // 计算动画进度，限制在 0 到 1 之间
		const easeProgress = easeInOutCubic(progress); // 缓入缓出效果

		const scrollX = startX + x * easeProgress; // 计算当前的滚动位置
		const scrollY = startY + y * easeProgress;

		target.scrollLeft = scrollX; // 设置滚动位置
		target.scrollTop = scrollY;

		if (elapsed < duration) {
			requestAnimationFrame(scrollStep); // 继续执行下一帧动画
		}
	}

	function easeInOutCubic(t: number) {
		// 缓入缓出效果的计算函数，使用的是缓入缓出的三次贝塞尔曲线
		return t < 0.5
			? 4 * t * t * t
			: (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	}

	requestAnimationFrame(scrollStep); // 开始执行滚动动画
}

export default scrollBySmooth;
