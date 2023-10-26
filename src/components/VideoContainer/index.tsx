import { useLayoutEffect, useRef } from "react";
import style from "./VideoContainer.module.scss";
// import { VideoInfo } from "@/types/video";

// type VideoContainerProps = {
// 	videoInfo: VideoInfo;
// };

/**
 * 视频容器单元
 */
function VideoContainer() {
	const videoRef = useRef<HTMLVideoElement>(null);
	useLayoutEffect(() => {
		const target = videoRef.current;
		if (target == null) return;
		target.addEventListener("canplay", () => {});
	}, [videoRef]);
	return (
		<div className={style["video-container"]}>
			<video
				playsInline
				controls
				ref={videoRef}
				onEnded={(e) => {
					// 循环播放
					e.currentTarget.play();
				}}
			>
				<source
					type='video/mp4'
					// src={new URL("@/assets/v1.mp4", import.meta.url).href}
					src='/v1.mp4'
				/>
			</video>
		</div>
	);
}

export default VideoContainer;
