import { useRef, useState, useCallback, useLayoutEffect } from "react";
import style from "./VideoController.module.scss";
import { videoTimeFormart } from "./VideoController";

/** 视频进度条参数 */
type VideoProgressProps = {
	video: HTMLVideoElement;
	playTime: number;
	bufferedTime: number;
	duration: number;
};

/**
 * 视频进度条
 */
function VideoProgress({
	video,
	playTime,
	bufferedTime,
	duration,
}: VideoProgressProps) {
	// 进度条拖拽指示器状态
	const [onProgressDrag, setOnProgressDrag] = useState(false);

	/** 进度条容器 */
	const progressContainerRef = useRef<HTMLDivElement>(null);
	/** 已播放进度条 */
	const progressPlayedRef = useRef<HTMLDivElement>(null);
	/** 已缓冲进度条 */
	const progressBufferedRef = useRef<HTMLDivElement>(null);

	/** 更新进度条方法 */
	const updateProgress = useCallback(
		(playPercent: number) => {
			if (progressPlayedRef.current) {
				progressPlayedRef.current.style.transform = `translateX(-${(
					(1 - playPercent) *
					100
				).toFixed(2)}%)`;
			}
		},
		[progressPlayedRef]
	);

	/** 更新缓冲条方法 */
	const updateBuffered = useCallback(
		(bufferedPercent: number) => {
			if (progressBufferedRef.current) {
				progressBufferedRef.current.style.transform = `translateX(-${(
					(1 - bufferedPercent) *
					100
				).toFixed(2)}%)`;
			}
		},
		[progressBufferedRef]
	);

	// 视频缓冲时更新缓冲条
	useLayoutEffect(() => {
		updateBuffered(bufferedTime / duration);
	}, [bufferedTime, duration, updateBuffered]);

	// 视频播放时逐帧更新进度条
	useLayoutEffect(() => {
		// 视频暂停时与进度条拖拽时不更新进度条
		if (video.paused || onProgressDrag) return;
		/** 动画帧句柄 */
		let frameHandle: number;
		/** 更新进度条方法 */
		const update = () =>
			(frameHandle = requestAnimationFrame(() => {
				updateProgress(video.currentTime / video.duration);
				// 递归动画帧更新
				update();
			}));
		// 立即执行
		update();
		return () => {
			// 取消动画帧
			cancelAnimationFrame(frameHandle);
		};
	}, [
		onProgressDrag,
		updateProgress,
		video.currentTime,
		video.duration,
		video.paused,
	]);

	/** 进度条拖拽事件 */
	const progressDragHandle = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			// 计算鼠标点击位置在进度条上的百分比
			const progress = e.currentTarget;
			const progressWidth = progress.clientWidth;
			const left = progress.getBoundingClientRect().left;
			// 立即更新一次进度条
			const progressWidthPercent = (e.clientX - left) / progressWidth;
			updateProgress(progressWidthPercent);
			video.currentTime = progressWidthPercent * duration;
			/** 鼠标移动事件 */
			const mouseMoveHandler = (e: MouseEvent) => {
				// 计算鼠标点击位置在进度条上的百分比
				const progressWidthPercent = (e.clientX - left) / progressWidth;
				// 更新进度条
				updateProgress(progressWidthPercent);
				// 更新视频播放进度
				video.currentTime = progressWidthPercent * duration;
			};
			/** 鼠标抬起事件 */
			const mouseUpHandler = () => {
				// 移除事件监听
				document.removeEventListener("mousemove", mouseMoveHandler);
				document.removeEventListener("mouseup", mouseUpHandler);
				// 设置进度条拖拽状态
				setOnProgressDrag(false);
			};
			// 添加事件监听
			document.addEventListener("mousemove", mouseMoveHandler);
			document.addEventListener("mouseup", mouseUpHandler);
			// 设置进度条拖拽状态
			setOnProgressDrag(true);
		},
		[duration, updateProgress, video]
	);

	return (
		<div className={style["progress-container"]} ref={progressContainerRef}>
			<div className={style.time}>{videoTimeFormart(playTime)}</div>

			<div className={style.progress} onMouseDown={progressDragHandle}>
				<div className={style["buffered"]} ref={progressBufferedRef} />
				<div className={style["played"]} ref={progressPlayedRef} />
				{/* <div
        className={style["progress-thumb"]}
        // style={{
        // 	transform: `translateX(${
        // 		(playTime / duration) * progressWidth
        // 	}px)`,
        // }}
        ref={progressThumbRef}
    /> */}
			</div>
			<div className={style.time}>{videoTimeFormart(duration)}</div>
		</div>
	);
}

export default VideoProgress;
