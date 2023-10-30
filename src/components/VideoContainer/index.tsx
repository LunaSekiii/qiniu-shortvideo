import {
	forwardRef,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
} from "react";
import style from "./VideoContainer.module.scss";
import VideoPlayer from "./VideoPlayer";
import Avatar from "../GlobalAvatar";
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
			<VideoInfo />
		</div>
	);
});

function VideoInfo() {
	return (
		<div className={style["video-info"]}>
			<div className={style["interaction-box"]}>
				<div className={style.user}>
					<Avatar styleConfig={{ width: "50px", height: "50px" }} />
					<div className={style["user-info"]}>
						<h2 className={style["user-name"]}>发布者</h2>
						<p className={style.time}>3天前</p>
					</div>
				</div>
				<div className={style.interaction}>交互区</div>
			</div>
			<div className={style.info}>
				<h1>Title</h1>
				<p>forum sssdsad sad asd asasd asd asd asd asd </p>
			</div>
		</div>
	);
}

export default VideoContainer;
