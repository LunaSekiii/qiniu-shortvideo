import { createContext, forwardRef, useImperativeHandle, useRef } from "react";
import style from "./VideoContainer.module.scss";
import VideoPlayer, { VideoPlayerRef } from "./VideoPlayer";
import { VideoInfo } from "./VideoInfo";

type VideoContainerProps = {
	video: VideoType.VideoInfo;
	nextVideo: () => void;
	isFullScreen: boolean;
	updateVideo: (video: VideoType.VideoInfo) => boolean;
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
const VideoContainer = forwardRef<
	{ scrollIntoView: () => void; onAutoPlay: () => void; onBlur: () => void },
	VideoContainerProps
>(function VideoContainer(props, ref) {
	const { video, nextVideo, isFullScreen } = props;

	const videoContainerRef = useRef<HTMLDivElement>(null);

	const videoPlayerRef = useRef<VideoPlayerRef>(null);

	// 暴露命令式句柄
	useImperativeHandle(ref, () => ({
		scrollIntoView: currentContainerScrollIntoView,
		onAutoPlay: () => {
			videoPlayerRef.current?.onAutoPlay();
			videoContainerRef.current?.scrollIntoView({
				block: "center",
				inline: "center",
			});
		},
		onBlur: () => {
			videoPlayerRef.current?.onBlur();
		},
	}));

	/** 当前容器滚动定位方法 */
	const currentContainerScrollIntoView = () => {
		const videoContainer = videoContainerRef.current;
		// if (!videoContainer) return;
		videoContainer?.scrollIntoView({
			block: "center",
			inline: "center",
		});
	};

	return (
		<div
			className={style["video-container"]}
			ref={videoContainerRef}
			data-fullscreen={isFullScreen}
		>
			<VideoContainerContext.Provider
				value={{
					currentContainerScrollIntoView,
				}}
			>
				<VideoPlayer
					// videoSrc='http://s34mqjagr.hn-bkt.clouddn.com/a8c549d8c1b3b5d81e55c8426460a469f97309b96b29b148de5655a13b2ccedb.mp4.m3u8'
					// videoSrc='http://s34mqjagr.hn-bkt.clouddn.com/8b1b4d1ee5b44e50a2e83158f815ca6c.mp4.m3u8'
					ref={videoPlayerRef}
					videoSrc={"http://" + video.url}
					cover={"http://" + video.picture}
					nextVideo={nextVideo}
					isFullscreen={isFullScreen}
				/>
				<VideoInfo video={video} isFullscreen={isFullScreen} />
			</VideoContainerContext.Provider>
		</div>
	);
});

export default VideoContainer;
