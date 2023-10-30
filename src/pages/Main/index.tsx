import { useLayoutEffect, useRef } from "react";
import style from "./Main.module.scss";
import HomePageLayout from "@/layouts/HomePageLayout";
import VideoContainer from "@/components/VideoContainer";

function Main() {
	return (
		<HomePageLayout>
			<VideoList />
			{/* <VideoSideBar /> */}
		</HomePageLayout>
	);
}

function VideoList() {
	const videoListRef = useRef<HTMLDivElement>(null);
	useLayoutEffect(() => {
		const target = videoListRef.current;
		if (target == null) return;
		const scrollHandler = (e: Event) => {
			// e.preventDefault();
			e.stopPropagation();
			return false;
		};
		target.addEventListener("wheel", scrollHandler, { passive: false });
		return () => {
			target.removeEventListener("whell", scrollHandler);
		};
	}, [videoListRef]);
	return (
		<div className={style["video-list"]} ref={videoListRef}>
			<VideoContainer />
			<VideoContainer />
			<VideoContainer />
		</div>
	);
}

function VideoSideBar() {
	return (
		<div className={style["side-bar"]}>
			<div className={style.switch}>
				<div className={style["switch-button"]}>↑</div>
				<div className={style["switch-button"]}>↓</div>
			</div>
			{/* TODO: 帮助选项 */}
		</div>
	);
}

export default Main;
