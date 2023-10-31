import { useLayoutEffect, useMemo, useRef, useState } from "react";
import style from "./VideoPlayer.module.scss";
import SVGIcon from "@/components/SVGIcon";

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
		<>
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
						e.currentTarget.play();
					}}
					onClick={(e) => {
						const video = e.currentTarget;
						if (video) {
							if (video.paused) return video.play();
							video.pause();
						}
					}}
				>
					<source type='video/mp4' src={videoSrc} />
				</video>
				{video ? <VideoController video={video} /> : <div>ssdsad</div>}
			</div>
		</>
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
	const [onPaused, setOnPaused] = useState(video.paused);

	/** 进度条宽度监听 */
	// useLayoutEffect(() => {
	// 	const progressContainer = progressContainerRef.current;
	// 	if (progressContainer) {
	// 		setProgressWidth(Number(progressContainer.clientWidth || 0));
	// 		window.addEventListener("resize", () => {
	// 			const progressContainer = progressContainerRef.current;
	// 			if (progressContainer)
	// 				setProgressWidth(
	// 					Number(progressContainer.clientWidth || 0)
	// 				);
	// 		});
	// 	}
	// 	[];
	// }, [progressContainerRef]);

	useLayoutEffect(() => {
		if (video) {
			video.addEventListener("timeupdate", () => {
				setPlayTime(video.currentTime);
				// progressThumbRef.current!.style.transform = `translateX(${
				// 	(video.currentTime / duration) * progressWidth - 12
				// }px)`;
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
	}, [video, duration]);

	useLayoutEffect(() => {
		if (video) {
			video.addEventListener("pause", () => {
				setOnPaused(true);
			});
			video.addEventListener("play", () => {
				setOnPaused(false);
			});
		}
		return () => {
			if (video) {
				video.removeEventListener("pause", () => {
					setOnPaused(true);
				});
				video.removeEventListener("play", () => {
					setOnPaused(false);
				});
			}
		};
	}, [video]);

	return (
		<div className={style.controller}>
			<div
				className={style["main"]}
				onClick={() => {
					video.paused ? video.play() : video.pause();
				}}
				data-paused={onPaused}
			>
				<div className={style["play-btn"]} data-paused={onPaused}>
					<SVGIcon name='play_arrow' active={onPaused} />
				</div>
			</div>
			<div
				className={style["progress-container"]}
				ref={progressContainerRef}
			>
				<div className={style.time}>{videoTimeFormart(playTime)}</div>

				<div
					className={style.progress}
					onClick={(e) => {
						const progress = e.currentTarget;
						const progressWidth = progress.clientWidth;
						const left = progress.getBoundingClientRect().left;
						const progressWidthPercent =
							(e.clientX - left) / progressWidth;
						video.currentTime = progressWidthPercent * duration;
					}}
					onMouseDown={() => {
						// console.log("down");
					}}
				>
					<div
						style={{
							transform: `translateX(-${(
								(1 - playTime / duration) *
								100
							).toFixed(2)}%)`,
						}}
					></div>
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
		</div>
	);
}

/**
 * 视频时间格式化
 */
const videoTimeFormart = (videoTime: number) => {
	function autoSupplement(val: number) {
		return val.toString().padStart(2, "0");
	}
	const seconds = Math.floor(videoTime);
	const min = Math.floor(seconds / 60);
	const hour = Math.floor(min / 60);
	return (
		(hour > 0 ? hour + ":" : "") +
		(autoSupplement(min % 60) + ":") +
		autoSupplement(seconds % 60)
	);
};

export default VideoPlayer;
