import { useLayoutEffect, useMemo, useRef, useState } from "react";
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
					e.currentTarget.play();
				}}
			>
				<source type='video/mp4' src={videoSrc} />
			</video>
			<VideoController videoRef={videoRef} />
		</div>
	);
}

type VideoControllerProps = {
	videoRef: React.RefObject<HTMLVideoElement>;
};

/**
 * 视频播放控件
 */
function VideoController(props: VideoControllerProps) {
	const { videoRef } = useMemo(() => props, [props]);
	const [playTime, setPlayTime] = useState(0);
	const [duration, setDuration] = useState(0);
	useLayoutEffect(() => {
		const video = videoRef.current;
		if (video) {
			video.addEventListener("timeupdate", () => {
				setDuration(video.duration);
				setPlayTime(video.currentTime);
			});
		}
		return () => {
			if (video) {
				setDuration(0);
				video.removeEventListener("timeupdate", () => {
					setPlayTime(video.currentTime);
				});
			}
		};
	}, [videoRef]);
	console.log(playTime, duration);
	return (
		<div className={style.controller}>
			<div className={style["progress-container"]}>
				<div
					className={style["progress-thumb"]}
					style={{
						transform: `translateX(${
							(playTime / duration) * 100
						}px)`,
					}}
					data-a
				></div>
				<div className={style.progress}></div>
			</div>
			<button
				onClick={() => {
					const video = videoRef.current;
					if (video) {
						if (video.paused) {
							video.play();
						} else {
							video.pause();
						}
					}
				}}
			>
				play/pause
			</button>
		</div>
	);
}

export default VideoPlayer;
