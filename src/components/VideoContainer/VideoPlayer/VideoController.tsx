import SVGIcon from "@/components/SVGIcon";
import { ListHandlerContext } from "@/pages/Main";
import { useMemo, useState, useContext } from "react";
import { VideoContainerContext } from "..";
import style from "./VideoController.module.scss";
import useVideoListened from "./useVideoListened";
import VideoProgress from "./VideoProgress";

type VideoControllerProps = {
	video: HTMLVideoElement;
};

/**
 * 视频播放控件
 */
function VideoController(props: VideoControllerProps) {
	const { video } = useMemo(() => props, [props]);

	// 视频监听绑定Hook
	const { playTime, bufferedTime, duration, onPaused } =
		useVideoListened(video);

	// 上下文提取
	const { handleListFullScreen } = useContext(ListHandlerContext);
	const { currentContainerScrollIntoView } = useContext(
		VideoContainerContext
	);

	const [onCheck, setOnCheck] = useState(false);
	return (
		<div className={style.controller}>
			<div
				className={style["main"]}
				onClick={() => {
					video.paused ? video.play() : video.pause();
				}}
				data-paused={onPaused}
			>
				<div className={style["play-btn"]} data-paused={onPaused}>
					<SVGIcon name='play_arrow' active={true} />
				</div>
				<div
					className={style["controll-block"]}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
				>
					<div>连播</div>
					<div
						className={style.switch}
						data-checked={onCheck}
						onClick={() => {
							setOnCheck(!onCheck);
						}}
					/>
					<div>自动</div>
					<div> 1×</div>
					<SVGIcon name='volume_up' active />
					<SVGIcon name='open_in_full' active />
					<div
						onClick={async () => {
							await handleListFullScreen();
							currentContainerScrollIntoView();
						}}
					>
						<SVGIcon name='fullscreen' active />
					</div>
				</div>
			</div>
			<VideoProgress
				{...{
					video,
					playTime,
					bufferedTime,
					duration,
				}}
			/>
		</div>
	);
}

/**
 * 视频时间格式化
 */
export const videoTimeFormart = (videoTime: number) => {
	function autoSupplement(val: number) {
		return val.toString().padStart(2, "0");
	}
	const seconds = Math.floor(videoTime);
	const min = Math.floor(seconds / 60);
	const hour = Math.floor(min / 60);
	return (
		(hour > 0 ? hour + ":" : "") +
		(autoSupplement(min % 60) + ":") +
		autoSupplement(seconds % 60)
	);
};

export default VideoController;
