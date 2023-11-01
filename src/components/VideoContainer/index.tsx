import {
	createContext,
	forwardRef,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
} from "react";
import style from "./VideoContainer.module.scss";
import VideoPlayer from "./VideoPlayer";
import { VideoInfo } from "./VideoInfo";

type VideoContainerProps = {
	// handleListScroll: (dirction: "up" | "down") => void;
	// currentContainerSnap: () => void;
};

type VideoContainerContextType = {
	// handleListScroll: (dirction: "up" | "down") => void;
	currentContainerSnap: () => void;
};

export const VideoContainerContext = createContext<VideoContainerContextType>({
	// handleListScroll: () => {},
	currentContainerSnap: () => {},
});

/**
 * 视频容器组件
 */
const VideoContainer = forwardRef<unknown, VideoContainerProps>(
	function VideoContainer(props, ref) {
		const videoRef = useRef<HTMLVideoElement>(null);
		const videoContainerRef = useRef<HTMLDivElement>(null);
		// 暴露命令式句柄
		useImperativeHandle(ref, () => ({}));

		useLayoutEffect(() => {
			const target = videoRef.current;
			if (target == null) return;
			target.addEventListener("canplay", () => {});
		}, [videoRef]);
		return (
			<div className={style["video-container"]} ref={videoContainerRef}>
				<VideoContainerContext.Provider
					value={{
						currentContainerSnap: () => {
							const videoContainer = videoContainerRef.current;
							if (!videoContainer) return;
							videoContainer.scrollIntoView({
								block: "center",
								inline: "center",
							});
						},
					}}
				>
					<VideoPlayer videoSrc='/v1.mp4' cover='/v1.png' />
					<VideoInfo />
				</VideoContainerContext.Provider>
			</div>
		);
	}
);

export default VideoContainer;
