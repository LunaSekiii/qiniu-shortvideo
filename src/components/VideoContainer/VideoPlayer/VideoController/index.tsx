import SVGIcon from "@/components/SVGIcon";
import { useLayoutEffect, useMemo } from "react";
import style from "./VideoController.module.scss";
import useVideoListened from "./useVideoListened";
import VideoProgress from "./components/VideoProgress";
import Hls from "hls.js";
import { FullscreenBtn } from "./components/FullscreenBtn";
import { VideoVolume } from "./components/VideoVolume";
import { VideoSpeed } from "./components/VideoSpeed";
import { VideoQuality } from "./components/VideoQuality";
import { VideoStreaming } from "./components/VideoStreaming";
import usePlayOptionStore from "@/stores/usePlayOptionStore";
import VideoComment from "./VideoComment";

type VideoControllerProps = {
	video: HTMLVideoElement;
	hls: Hls;
	isFullscreen: boolean;
};

/**
 * 视频播放控件
 */
function VideoController(props: VideoControllerProps) {
	const { video, hls, isFullscreen } = useMemo(() => props, [props]);

	// 视频监听绑定Hook
	const { playTime, bufferedTime, duration, onPaused } =
		useVideoListened(video);

	const playOption = usePlayOptionStore((state) => state.playOption);

	useLayoutEffect(() => {
		video.volume = playOption.playVolume;
		video.playbackRate = playOption.playSpeed;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={style.controller} data-fullscreen={isFullscreen}>
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
					<VideoStreaming />
					<VideoQuality hls={hls} />
					<VideoSpeed video={video} />
					<VideoVolume video={video} />
					{/* <div className={style.btn}>
						<SVGIcon name='open_in_full' active />
					</div> */}
					<FullscreenBtn />
				</div>
				<VideoComment />
			</div>
			<VideoProgress
				{...{
					video,
					playTime,
					bufferedTime,
					duration,
				}}
			/>
		</div>
	);
}

export default VideoController;
