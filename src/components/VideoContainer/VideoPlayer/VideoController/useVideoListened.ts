import { postVideoInteraction } from "@/apis/video";
import {
	useMemo,
	useState,
	useCallback,
	useLayoutEffect,
	useContext,
} from "react";
import { VideoContainerContext } from "../..";

/**
 * 视频监听绑定Hook
 */
const useVideoListened = (video: HTMLVideoElement) => {
	const [playTime, setPlayTime] = useState(0);
	const [bufferedTime, setBufferedTime] = useState(0);
	const [duration, setDuration] = useState(video.duration);
	const [onPaused, setOnPaused] = useState(video.paused);
	const { videoId } = useContext(VideoContainerContext);
	// video监听器
	/** 视频播放时间监听 */
	const videoTimeupdateListener = useCallback((e: Event) => {
		const video = e.currentTarget as HTMLVideoElement;
		setPlayTime(video.currentTime);
	}, []);
	/** 视频总时长监听 */
	const videoDurationchangeListener = useCallback((e: Event) => {
		const video = e.currentTarget as HTMLVideoElement;
		setDuration(video.duration);
	}, []);
	/** 视频缓冲监听 */
	const videoProgressListener = useCallback((e: Event) => {
		const video = e.currentTarget as HTMLVideoElement;
		if (video.buffered.length > 0) {
			setBufferedTime(video.buffered.end(video.buffered.length - 1));
		}
	}, []);
	/** 视频暂停监听 */
	const videoPauseListener = useCallback(() => {
		// 视频暂停时，发送播放记录
		if (video.currentTime / video.duration > 0.1)
			postVideoInteraction({
				videoId,
				type: 2,
				data: (video.currentTime / video.duration) * 100,
			});
		setOnPaused(true);
	}, [videoId]);

	/** 视频播放监听 */
	const videoPlayListener = useCallback(() => {
		// 视频播放时，发送播放记录
		postVideoInteraction({
			videoId,
			type: 1,
			data: 1,
		});
		setOnPaused(false);
	}, [videoId]);

	type VideoListenerMap = Partial<
		Record<keyof HTMLVideoElementEventMap, (e: Event) => unknown>
	>;

	/** video监听器映射 */
	const videoListenerMap: VideoListenerMap = useMemo(
		() => ({
			timeupdate: videoTimeupdateListener,
			durationchange: videoDurationchangeListener,
			progress: videoProgressListener,
			pause: videoPauseListener,
			play: videoPlayListener,
		}),
		[
			videoTimeupdateListener,
			videoDurationchangeListener,
			videoProgressListener,
			videoPauseListener,
			videoPlayListener,
		]
	);

	// 绑定video事件
	useLayoutEffect(() => {
		Object.entries(videoListenerMap).forEach(([key, value]) => {
			video.addEventListener(key, value as EventListener);
		});
		return () => {
			Object.entries(videoListenerMap).forEach(([key, value]) => {
				video.removeEventListener(key, value as EventListener);
			});
		};
	}, [video, videoListenerMap]);
	return { playTime, bufferedTime, duration, onPaused };
};

export default useVideoListened;
