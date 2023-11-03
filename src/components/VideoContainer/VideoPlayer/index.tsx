import {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import style from "./VideoPlayer.module.scss";
import Hls from "hls.js";
import VideoController from "./VideoController";
import usePlayOptionStore from "@/stores/usePlayOptionStore";

type VideoPlayerProps = {
	/** 视频 */
	videoSrc: string;
	/** 封面 */
	cover: string;
	/** 连播 */
	nextVideo: () => void;
};

export type VideoPlayerRef = {
	/** 自动播放 */
	onAutoPlay: () => void;
	/** 失去焦点暂停播放 */
	onBlur: () => void;
};

/**
 * 视频播放器组件
 */
const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
	function VideoPlayer(props, ref) {
		const { videoSrc, cover, nextVideo } = useMemo(() => props, [props]);
		const videoRef = useRef<HTMLVideoElement>(null);
		const [loadedVideo, setLoadedVideo] = useState<HTMLVideoElement | null>(
			null
		);
		const [hls, setHls] = useState<Hls | null>(null);
		const playMode = usePlayOptionStore(
			(state) => state.playOption.playMode
		);

		// 自动播放
		const autoPlay = useCallback((e: Event) => {
			(e.currentTarget as HTMLVideoElement).play();
		}, []);

		// 自动播放触发
		const onAutoPlay = () => {
			if (loadedVideo) {
				loadedVideo.play();
			} else {
				videoRef.current?.addEventListener("canplay", autoPlay);
			}
		};

		// 失去焦点暂停播放
		const onBlur = () => {
			loadedVideo?.pause();
			videoRef.current?.removeEventListener("canplay", autoPlay);
		};

		useImperativeHandle(ref, () => ({
			onAutoPlay,
			onBlur,
		}));

		const playQuality = usePlayOptionStore(
			(state) => state.playOption.playQuality
		);

		// 绑定Hls并加载视频
		useLayoutEffect(() => {
			const video = videoRef.current;
			if (!Hls.isSupported() || !video) return;

			const hls = new Hls();
			setHls(hls);
			hls.attachMedia(video);

			hls.on(Hls.Events.MEDIA_ATTACHED, function () {
				// console.log("video and hls.js are now bound together !");
				// 通过Hls加载视频源
				hls.loadSource(videoSrc);
				hls.on(Hls.Events.MANIFEST_PARSED, function () {
					// 默认播放自动画质
					hls.startLevel = Math.min(
						playQuality,
						hls.levels.length - 1
					);
				});
			});

			return () => {
				setHls(null);
				hls.destroy();
			};
		}, [videoRef, videoSrc]);

		return (
			<>
				<div
					className={style.player}
					style={
						{ "--video-bg": `url(${cover})` } as React.CSSProperties
					}
				>
					<video
						playsInline
						ref={videoRef}
						onEnded={(e) => {
							// 连播模式下，播放结束后结束播放
							if (playMode) return nextVideo();
							// 循环播放
							e.currentTarget.play();
						}}
						onLoadedData={(e) => {
							setLoadedVideo(e.currentTarget);
						}}
						onClick={(e) => {
							const video = e.currentTarget;
							if (video) {
								if (video.paused) return video.play();
								video.pause();
							}
						}}
					/>
					{loadedVideo && hls ? (
						<VideoController video={loadedVideo} hls={hls} />
					) : (
						<div></div>
					)}
				</div>
			</>
		);
	}
);

export default VideoPlayer;
