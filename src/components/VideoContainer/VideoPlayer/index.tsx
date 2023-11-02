import { useLayoutEffect, useMemo, useRef, useState } from "react";
import style from "./VideoPlayer.module.scss";
import Hls from "hls.js";
import VideoController from "./VideoController";

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
	const [hls, setHls] = useState<Hls | null>(null);

	// 绑定Hls并加载视频
	useLayoutEffect(() => {
		const video = videoRef.current;
		if (!Hls.isSupported() || !video) return;

		const hls = new Hls();
		setHls(hls);
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
			});
		});

		// // hls更新画质事件
		// hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
		// 	console.log("LEVEL_SWITCHED", data, "更新了");
		// });

		return () => {
			setHls(null);
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

export default VideoPlayer;
