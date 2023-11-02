import { createContext, forwardRef, useImperativeHandle, useRef } from "react";
import style from "./VideoContainer.module.scss";
import VideoPlayer from "./VideoPlayer";
import { VideoInfo } from "./VideoInfo";

type VideoContainerProps = {
	// handleListScroll: (dirction: "up" | "down") => void;
	// currentContainerSnap: () => void;
	video: Video.VideoInfo;
};

type VideoContainerContextType = {
	/** 当前容器滚动到视图方法 */
	currentContainerScrollIntoView: () => void;
};

export const VideoContainerContext = createContext<VideoContainerContextType>({
	currentContainerScrollIntoView: () => {},
});

/**
 * 视频容器组件
 */
const VideoContainer = forwardRef<unknown, VideoContainerProps>(
	function VideoContainer(props, ref) {
		const { video } = props;

		const videoContainerRef = useRef<HTMLDivElement>(null);
		// 暴露命令式句柄
		useImperativeHandle(ref, () => ({}));

		/** 当前容器滚动定位方法 */
		const currentContainerScrollIntoView = () => {
			const videoContainer = videoContainerRef.current;
			if (!videoContainer) return;
			videoContainer.scrollIntoView({
				block: "center",
				inline: "center",
			});
		};

		return (
			<div className={style["video-container"]} ref={videoContainerRef}>
				<VideoContainerContext.Provider
					value={{
						currentContainerScrollIntoView,
					}}
				>
					<VideoPlayer
						// videoSrc='http://s34mqjagr.hn-bkt.clouddn.com/a8c549d8c1b3b5d81e55c8426460a469f97309b96b29b148de5655a13b2ccedb.mp4.m3u8'
						// videoSrc='http://s34mqjagr.hn-bkt.clouddn.com/8b1b4d1ee5b44e50a2e83158f815ca6c.mp4.m3u8'
						videoSrc={"http://" + video.url}
						cover={"http://" + video.picture}
					/>
					<VideoInfo video={video} />
				</VideoContainerContext.Provider>
			</div>
		);
	}
);

export default VideoContainer;
