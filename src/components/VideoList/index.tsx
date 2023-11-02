import {
	createContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import style from "./VideoList.module.scss";
import VideoContainer from "@/components/VideoContainer";
import throttle from "@/utils/throttle";
import scrollSmooth from "@/utils/scrollSmooth";

type ListHandlerContextType = {
	/** 列表滚动处理器 */
	handleListScroll: (dirction: "up" | "down") => void;
	/** 列表全屏切换处理器 */
	handleListFullScreen: () => Promise<boolean>;
};

export const ListHandlerContext = createContext<ListHandlerContextType>({
	handleListScroll: () => {},
	handleListFullScreen: async () => false,
});

type VideoListProps = {
	list: Video.VideoInfo[];
	hasMore: boolean;
};

/**
 * 视频列表组件
 */
export function VideoList(props: VideoListProps) {
	const videoListRef = useRef<HTMLDivElement>(null);

	const [list, setList] = useState(props.list);
	const [hasMore, setHasMore] = useState(props.hasMore);

	useEffect(() => {
		setList(props.list);
		setHasMore(props.hasMore);
	}, [props]);

	// TODO: 分页加载

	/** 列表滚动事件 */
	const handlerListScroll = throttle((dirction: "up" | "down" = "down") => {
		const videoList = videoListRef.current;
		if (!videoList) return;
		scrollSmooth(
			videoList,
			0,
			(dirction === "down" ? 1 : -1) * window.innerHeight,
			500
		);
		// videoList.onscrollend = (e) => console.log("<<<<", e);
	}, 600);

	/** 列表全屏事件 */
	const handlerListFullScreen = async () => {
		const videoList = videoListRef.current;
		if (!videoList) return false;
		const isCurrentFullscreen = !!document.fullscreenElement;
		const fullscreenPromise = isCurrentFullscreen
			? document.exitFullscreen()
			: videoList.requestFullscreen();
		await fullscreenPromise;
		return !isCurrentFullscreen;
	};

	useLayoutEffect(() => {
		const target = videoListRef.current;
		if (target == null) return;
		const scrollHandler = (ev: Event) => {
			const e = ev as WheelEvent;
			e.preventDefault();
			// 根据滚动的方向触发
			if (e.deltaY > 0) handlerListScroll("down");
			else handlerListScroll("up");
			e.stopPropagation();
		};
		target.addEventListener("wheel", scrollHandler, { passive: false });

		return () => {
			target.removeEventListener("whell", scrollHandler);
		};
	}, [handlerListScroll, videoListRef]);

	return (
		<div
			className={style["video-list"]}
			ref={videoListRef}
			tabIndex={-1}
			onKeyDown={(e) => {
				if (e.key === "ArrowDown") handlerListScroll("down");
				else if (e.key === "ArrowUp") handlerListScroll("up");
				// 阻止浏览器默认列表滚动
				if (
					e.key === "ArrowDown" ||
					e.key === "ArrowUp" ||
					e.key === " "
				)
					e.preventDefault();
			}}
			onMouseDown={(e) => {
				// 阻止鼠标中键滚动
				if (e.button == 1) e.preventDefault();
			}}
		>
			<ListHandlerContext.Provider
				value={{
					handleListScroll: handlerListScroll,
					handleListFullScreen: handlerListFullScreen,
				}}
			>
				{list.map((video) => (
					<VideoContainer key={video.videoId} video={video} />
				))}
				{/* <VideoContainer />
				<VideoContainer /> */}
			</ListHandlerContext.Provider>
		</div>
	);
}
