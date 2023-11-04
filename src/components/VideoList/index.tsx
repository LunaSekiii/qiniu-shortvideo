import { createContext, useLayoutEffect, useMemo, useRef } from "react";
import style from "./VideoList.module.scss";
import VideoContainer from "@/components/VideoContainer";
import throttle from "@/utils/throttle";
import scrollSmooth from "@/utils/scrollSmooth";
import useDataFlowShow from "./useDataFlowShow";
import useEventCallback from "../../utils/useEventCallback";

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
	data: Video.VideoInfo[];
	getData: () => Promise<Video.VideoInfo[]>;
	resetData: () => Promise<Video.VideoInfo[]>;
};

/**
 * 视频列表组件
 */
export function VideoList(props: VideoListProps) {
	const { data, getData } = props;
	const videoListRef = useRef<HTMLDivElement>(null);

	// 数据流处理
	const { showDataList, switchData, hasNext, hasPrev } = useDataFlowShow({
		data,
		getData,
	});

	// TODO: 分页加载

	/** 翻页方法(550ms节流) */
	const handlerPageChange = useMemo(
		() =>
			throttle((dirction: "up" | "down" = "down") => {
				const videoList = videoListRef.current;
				if (!videoList) return false;
				scrollSmooth(
					videoList,
					0,
					(dirction === "down" ? 1 : -1) * window.innerHeight,
					500
				);
			}, 550),
		[]
	);

	/** 列表滚动事件 */
	const handlerListScrollImpl = useEventCallback(
		async (dirction: "up" | "down" = "down") => {
			if (dirction === "down" && !hasNext) return;
			if (dirction === "up" && !hasPrev) return;
			// 触发翻页
			handlerPageChange(dirction);
			// 延时500ms加载下一页
			await new Promise((resolve) => setTimeout(resolve, 600));

			// 切换数据
			switchData(dirction === "down" ? "next" : "prev");
		}
	);

	const handlerListScroll = useMemo(
		() => throttle(handlerListScrollImpl, 700),
		[handlerListScrollImpl]
	);

	const middleScrollIntoView = useRef<() => void>();

	/** 列表全屏事件 */
	const handlerListFullScreen = async () => {
		const videoList = videoListRef.current;
		if (!videoList) return false;
		const isCurrentFullscreen = !!document.fullscreenElement;

		const fullscreenPromise = isCurrentFullscreen
			? document.exitFullscreen()
			: videoList.requestFullscreen();
		await fullscreenPromise;
		if (!isCurrentFullscreen) {
			let fullScreenSignal = false;
			const fullScreenListener = () => {
				if (!fullScreenSignal) return (fullScreenSignal = true);
				videoList.removeEventListener(
					"fullscreenchange",
					fullScreenListener
				);
				console.log("aa");
				setTimeout(() => {
					middleScrollIntoView.current?.();
				}, 0);
			};
			videoList.addEventListener("fullscreenchange", fullScreenListener);
		}
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
				{showDataList.map((video, index) => (
					<VideoContainer
						key={video.videoId}
						video={video}
						nextVideo={() => handlerListScroll("down")}
						ref={(ref) => {
							if (
								(showDataList.length === 3 && index === 1) ||
								(!hasNext && index === 1) ||
								(!hasPrev && index === 0)
							) {
								// 锚定中间元素
								middleScrollIntoView.current =
									ref?.scrollIntoView;
								ref?.onAutoPlay();
							} else {
								// 非中间元素处理
								ref?.onBlur();
							}
						}}
					/>
				))}
			</ListHandlerContext.Provider>
		</div>
	);
}
