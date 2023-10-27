import {
	forwardRef,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
} from "react";
import style from "./VideoContainer.module.scss";
import VideoPlayer from "./VideoPlayer";
// import { VideoInfo } from "@/types/video";

// type VideoContainerProps = {
// 	videoInfo: VideoInfo;
// };

/**
 * 视频容器组件
 */
const VideoContainer = forwardRef(function VideoContainer(props, ref) {
	const videoRef = useRef<HTMLVideoElement>(null);
	// 暴露命令式句柄
	useImperativeHandle(ref, () => ({}));
	useLayoutEffect(() => {
		const target = videoRef.current;
		if (target == null) return;
		target.addEventListener("canplay", () => {});
	}, [videoRef]);
	return (
		<div className={style["video-container"]}>
			<VideoPlayer videoSrc='/v1.mp4' cover='/v1.png' />
		</div>
	);
});

export default VideoContainer;
