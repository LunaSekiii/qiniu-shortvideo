import { createContext, useLayoutEffect, useRef } from "react";
import style from "./Main.module.scss";
import HomePageLayout from "@/layouts/HomePageLayout";
import VideoContainer from "@/components/VideoContainer";
import throttle from "@/utils/throttle";
import scrollSmooth from "@/utils/scrollSmooth";

function Main() {
	return (
		<HomePageLayout>
			<VideoList />
			{/* <VideoSideBar /> */}
		</HomePageLayout>
	);
}

type ListHandlerContextType = {
	handlerListScroll: (dirction: "up" | "down") => void;
	handlerListFullScreen: () => void;
};

export const ListHandlerContext = createContext<ListHandlerContextType>({
	handlerListScroll: () => {},
	handlerListFullScreen: () => Promise<void>,
});

function VideoList() {
	const videoListRef = useRef<HTMLDivElement>(null);

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
		if (!videoList) return;
		const fullscreenPromise = document.fullscreenElement
			? document.exitFullscreen()
			: videoList.requestFullscreen();
		await fullscreenPromise;
		return;
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
				if (e.key === "ArrowDown" || e.key === "ArrowUp")
					e.preventDefault();
			}}
			onMouseDown={(e) => {
				// 阻止鼠标中键滚动
				if (e.button == 1) e.preventDefault();
			}}
		>
			<ListHandlerContext.Provider
				value={{ handlerListScroll, handlerListFullScreen }}
			>
				<VideoContainer />
				<VideoContainer />
				<VideoContainer />
			</ListHandlerContext.Provider>
		</div>
	);
}

export default Main;
