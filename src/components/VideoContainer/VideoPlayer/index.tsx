import {
	useCallback,
	useContext,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import style from "./VideoPlayer.module.scss";
import SVGIcon from "@/components/SVGIcon";
import { VideoContainerContext } from "..";
import { ListHandlerContext } from "@/pages/Main";
import Hls from "hls.js";

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
	const [loadedVideo, setLoadedVideo] = useState<HTMLVideoElement | null>(
		null
	);

	// 绑定Hls并加载视频
	useLayoutEffect(() => {
		const video = videoRef.current;
		if (!Hls.isSupported() || !video) return;

		const hls = new Hls();
		hls.attachMedia(video);

		hls.on(Hls.Events.MEDIA_ATTACHED, function () {
			console.log("video and hls.js are now bound together !");
			hls.loadSource(videoSrc);
			hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
				console.log(
					"manifest loaded, found " +
						data.levels.length +
						" quality level",
					data.levels,
					hls.currentLevel
				);
				setTimeout(() => {
					hls.currentLevel = data.levels.length - 1;
					console.log("currentLevel", hls.currentLevel, data.levels);
				}, 1000);
			});
		});

		hls.on(Hls.Events.LEVELS_UPDATED, (e) => {
			console.log("LEVELS_UPDATED", hls.levels);
		});

		return () => {
			hls.destroy();
		};
	}, [videoRef, videoSrc]);

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
					onLoadedData={(e) => {
						setLoadedVideo(e.currentTarget);
						// 输出视频已缓存的时间长度
						console.log(
							e.currentTarget.buffered.end(
								e.currentTarget.buffered.length - 1
							),
							e.currentTarget.duration
						);
					}}
					onClick={(e) => {
						const video = e.currentTarget;
						if (video) {
							if (video.paused) return video.play();
							video.pause();
						}
					}}
				/>
				{loadedVideo ? (
					<VideoController video={loadedVideo} />
				) : (
					<div></div>
				)}
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
	const progressPlayedRef = useRef<HTMLDivElement>(null);
	const progressBufferedRef = useRef<HTMLDivElement>(null);
	const [onProgressDrag, setOnProgressDrag] = useState(false);
	const [playTime, setPlayTime] = useState(0);
	const [duration, setDuration] = useState(video.duration);
	const [onPaused, setOnPaused] = useState(video.paused);

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
			});
			video.addEventListener("durationchange", () => {
				setDuration(video.duration);
			});
			video.addEventListener("progress", () => {
				if (video.buffered.length > 0) {
					updateBuffered(
						video.buffered.end(video.buffered.length - 1) /
							video.duration
					);
				}
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

	const [onCheck, setOnCheck] = useState(false);
	// 视频播放时使用requestAnimationFrame更新进度条
	useLayoutEffect(() => {
		if (video.paused) return;
		let timer: number;
		if (!onProgressDrag) {
			const a = () =>
				(timer = requestAnimationFrame(() => {
					updateProgress(video.currentTime / video.duration);
					a();
				}));
			a();
		}
		return () => {
			cancelAnimationFrame(timer);
		};
	}, [onProgressDrag, video.currentTime, video.duration, video.paused]);

	const { handlerListFullScreen } = useContext(ListHandlerContext);
	const { currentContainerSnap } = useContext(VideoContainerContext);

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
					<SVGIcon name='play_arrow' active={true} />
				</div>
				<div
					className={style["controll-block"]}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
				>
					<div>连播</div>
					<div
						className={style.switch}
						data-checked={onCheck}
						onClick={() => {
							setOnCheck(!onCheck);
						}}
					/>
					<div>自动</div>
					<div> 1×</div>
					<SVGIcon name='volume_up' active />
					<SVGIcon name='open_in_full' active />
					<div
						onClick={async () => {
							await handlerListFullScreen();
							currentContainerSnap();
						}}
					>
						<SVGIcon name='fullscreen' active />
					</div>
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
					onMouseDown={(e) => {
						// 进度条拖拽事件
						const progress = e.currentTarget;
						const progressWidth = progress.clientWidth;
						const left = progress.getBoundingClientRect().left;
						const progressWidthPercent =
							(e.clientX - left) / progressWidth;
						updateProgress(progressWidthPercent);
						video.currentTime = progressWidthPercent * duration;
						const mouseMoveHandler = (e: MouseEvent) => {
							const progressWidthPercent =
								(e.clientX - left) / progressWidth;
							updateProgress(progressWidthPercent);
							video.currentTime = progressWidthPercent * duration;
						};
						const mouseUpHandler = () => {
							document.removeEventListener(
								"mousemove",
								mouseMoveHandler
							);
							document.removeEventListener(
								"mouseup",
								mouseUpHandler
							);
							setOnProgressDrag(false);
						};
						document.addEventListener(
							"mousemove",
							mouseMoveHandler
						);
						document.addEventListener("mouseup", mouseUpHandler);
						setOnProgressDrag(true);
					}}
				>
					<div
						className={style["buffered"]}
						ref={progressBufferedRef}
					/>
					<div
						className={style["played"]}
						ref={progressPlayedRef}
						// style={{
						// 	transform: `translateX(-${(
						// 		(1 - playTime / duration) *
						// 		100
						// 	).toFixed(2)}%)`,
						// }}
					/>
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
