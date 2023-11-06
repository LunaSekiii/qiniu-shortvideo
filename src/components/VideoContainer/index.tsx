import React, {
	createContext,
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
} from "react";
import style from "./VideoContainer.module.scss";
import VideoPlayer, { VideoPlayerRef } from "./VideoPlayer";
import { VideoInfo } from "./VideoInfo";

/**
 * 视频容器组件参数
 */
type VideoContainerProps = {
	video: VideoType.VideoInfo;
	nextVideo: () => void;
	isFullScreen: boolean;
	updateVideo: (video: VideoType.VideoInfo) => boolean;
};

/**
 * 视频容器组件暴露句柄类型
 */
type VideoContainerHandle = {
	/** 滚动到当前容器视图方法 */
	scrollIntoView: () => void;
	/** 视频自动播放方法 */
	onAutoPlay: () => void;
	/** 视频失焦方法 */
	onBlur: () => void;
};

type VideoContainerContextType = {
	/** 当前容器滚动到视图方法 */
	currentContainerScrollIntoView: () => void;
	/** 更新当前视频信息方法 */
	updateVideo: (
		fn: (
			video: VideoType.VideoInfo,
			updateVideo: (video: VideoType.VideoInfo) => boolean
		) => boolean
	) => void;
	/** 视频Id */
	videoId: VideoType.VideoInfo["videoId"];
	/** 评论区开启状态 */
	isCommentOpen?: boolean;
	/** 切换评论区开启状态 */
	setIsCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const VideoContainerContext = createContext<VideoContainerContextType>({
	currentContainerScrollIntoView: () => {},
	updateVideo: () => {},
	videoId: -1,
	isCommentOpen: false,
	setIsCommentOpen: () => {},
});

/**
 * 视频容器组件
 */
const VideoContainer = forwardRef<VideoContainerHandle, VideoContainerProps>(
	function VideoContainer(props, ref) {
		const { video, nextVideo, isFullScreen, updateVideo } = props;

		const videoContainerRef = useRef<HTMLDivElement>(null);

		const videoPlayerRef = useRef<VideoPlayerRef>(null);

		const [isCommentOpen, setIsCommentOpen] = React.useState(false);

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

		/** 更新当前视频信息方法  */
		const updateCurVideo = useCallback(
			(
				fn: (
					video: VideoType.VideoInfo,
					updateVideo: (video: VideoType.VideoInfo) => boolean
				) => boolean
			) => {
				fn(video, updateVideo);
			},
			[updateVideo, video]
		);

		return (
			<div
				className={style["video-container"]}
				ref={videoContainerRef}
				data-fullscreen={isFullScreen}
			>
				<VideoContainerContext.Provider
					value={{
						currentContainerScrollIntoView,
						updateVideo: updateCurVideo,
						videoId: video.videoId,
						isCommentOpen,
						setIsCommentOpen,
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
	}
);

export default VideoContainer;
