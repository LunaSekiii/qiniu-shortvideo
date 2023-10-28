import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import style from "./VideoPlayer.module.scss";

type VideoPlayerProps = {
	/** 视频 */
	videoSrc: string;
	/** 封面 */
	cover: string;
};

/**
 * 视频播放器组件
 */
function VideoPlayer(props: VideoPlayerProps) {
	const { videoSrc, cover } = useMemo(() => props, [props]);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [video, setVideo] = useState<HTMLVideoElement | null>(null);
	useLayoutEffect(() => {
		const video = videoRef.current;
		if (video) {
			video.addEventListener("loadeddata", () => {
				setVideo(video);
			});
			return () => {
				video.removeEventListener("loadeddata", () => {
					setVideo(video);
				});
			};
		}
	}, [videoRef]);
	return (
		<div
			className={style.player}
			style={{ "--video-bg": `url(${cover})` } as React.CSSProperties}
		>
			<video
				playsInline
				// controls
				ref={videoRef}
				onEnded={(e) => {
					// 循环播放
					// e.currentTarget.play();
				}}
			>
				<source type='video/mp4' src={videoSrc} />
			</video>
			{video ? <VideoController video={video} /> : <div>ssdsad</div>}
		</div>
	);
}

type VideoControllerProps = {
	video: HTMLVideoElement;
};

/**
 * 视频播放控件
 */
function VideoController(props: VideoControllerProps) {
	const { video } = useMemo(() => props, [props]);
	const progressContainerRef = useRef<HTMLDivElement>(null);
	const [playTime, setPlayTime] = useState(0);
	const [duration, setDuration] = useState(video.duration);
	const [playStatus, setPlayStatus] = useState(!video.paused);
	const [progressWidth, setProgressWidth] = useState(0);
	const progressThumbRef = useRef<HTMLDivElement>(null);

	// /**
	//  * 视频进度计算方法
	//  */
	// function progressCompute(curT: number, totalT: number): number {
	// 	return (curT / totalT) % 1;
	// }

	// const progressController = (
	// 	relativeTime: number,
	// 	duration: number,
	// 	progress: HTMLDivElement,
	// 	progressMaxLength: number
	// ) => {
	// 	const startTime = new Date().getTime();
	// 	let stopSign = false;
	// 	const updatePeogress = () => {
	// 		if (stopSign) return;
	// 		const nowTime = new Date().getTime();
	// 		const progressWidth =
	// 			progressCompute(
	// 				// (nowTime - startTime) / 1000 + relativeTime,
	// 				video.currentTime,
	// 				duration
	// 			) *
	// 			(progressMaxLength - 12);
	// 		// progress.style.translate = `${progressWidth} 0`;
	// 		progress.style.transform = `translateX(${progressWidth}px)`;
	// 		// console.log(
	// 		// 	progressCompute(
	// 		// 		(nowTime - startTime) / 1000 + relativeTime,
	// 		// 		duration
	// 		// 	)
	// 		// );
	// 		requestAnimationFrame(updatePeogress);
	// 	};
	// 	updatePeogress();
	// 	return () => {
	// 		stopSign = true;
	// 	};
	// };

	// useLayoutEffect(() => {
	// 	const progressThumb = progressThumbRef.current;
	// 	if (!progressThumb) return;
	// 	let a: Function | null;
	// 	const startProgress = () => {
	// 		setPlayStatus(true);
	// 		a = progressController(
	// 			video.currentTime,
	// 			duration,
	// 			progressThumb,
	// 			progressWidth
	// 		);
	// 	};
	// 	playStatus ? startProgress() : null;
	// 	const stopProgress = () => {
	// 		setPlayStatus(false);
	// 		if (a) a();
	// 	};
	// 	// console.log(progressWidth);
	// 	video.addEventListener("play", startProgress);
	// 	video.addEventListener("pause", stopProgress);
	// 	return () => {
	// 		try {
	// 			if (a) a();
	// 		} catch (e) {
	// 			// console.log(e);
	// 		}
	// 		video.removeEventListener("play", startProgress);
	// 		video.removeEventListener("pause", stopProgress);
	// 	};
	// }, [video, progressThumbRef, progressWidth, duration]);

	/** 进度条宽度监听 */
	useLayoutEffect(() => {
		const progressContainer = progressContainerRef.current;
		if (progressContainer) {
			setProgressWidth(Number(progressContainer.clientWidth || 0));
			window.addEventListener("resize", () => {
				const progressContainer = progressContainerRef.current;
				if (progressContainer)
					setProgressWidth(
						Number(progressContainer.clientWidth || 0)
					);
			});
		}
		[];
	}, [progressContainerRef]);

	useEffect(() => {
		if (playStatus) {
			video.play();
		} else {
			video.pause();
		}
	}, [playStatus, video]);

	useLayoutEffect(() => {
		if (video) {
			video.addEventListener("timeupdate", () => {
				setPlayTime(video.currentTime);
				console.log(video.currentTime, duration, progressWidth);
				progressThumbRef.current!.style.transform = `translateX(${
					(video.currentTime / duration) * progressWidth - 12
				}px)`;
			});
			video.addEventListener("durationchange", () => {
				// console.log(video.duration, "<<<<");
				setDuration(video.duration);
			});
		}

		return () => {
			if (video) {
				video.removeEventListener("timeupdate", () => {
					setPlayTime(video.currentTime);
				});
			}
		};
	}, [video, progressWidth]);
	return (
		<div className={style.controller}>
			<div
				className={style["progress-container"]}
				ref={progressContainerRef}
			>
				<div
					className={style["progress-thumb"]}
					// style={{
					// 	transform: `translateX(${
					// 		(playTime / duration) * progressWidth
					// 	}px)`,
					// }}
					ref={progressThumbRef}
				></div>
				<div className={style.progress}></div>
			</div>
			<div style={{ display: "flex" }}>
				<button
					onClick={() => {
						if (video) {
							if (video.paused) {
								setPlayStatus(true);
							} else {
								setPlayStatus(false);
							}
						}
					}}
				>
					{playStatus ? "暂停" : "播放"}
				</button>
				<div>
					{playTime}/{duration}
				</div>
			</div>
		</div>
	);
}

export default VideoPlayer;
