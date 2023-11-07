import style from "./VideoInteraction.module.scss";
import { VideoParise } from "./components/VideoParise";
import { VideoCollection } from "./components/VideoCollection";
import { VideoInteractionItem } from "./components/VideoInteractionItem";
import { useContext } from "react";
import { VideoContainerContext } from "@/components/VideoContainer";
import { postVideoInteraction } from "@/apis/video";
import { toast } from "react-toastify";

/**
 * 视频交互组件
 */
export function VideoInteraction(props: { video: VideoType.VideoInfo }) {
	const { video } = props;
	const { setIsCommentOpen } = useContext(VideoContainerContext);
	const { videoId } = useContext(VideoContainerContext);
	return (
		<div className={style.interaction}>
			<VideoParise
				praised={video.praised}
				pariseCount={video.count.praiseCount}
			/>
			<div
				onClick={() => {
					postVideoInteraction({
						videoId,
						type: 3,
						data: 1,
					});
					setIsCommentOpen((s) => !s);
				}}
			>
				<VideoInteractionItem
					name='chat'
					count={video.count.commentCount}
				/>
			</div>
			<VideoCollection
				collected={video.collected}
				collectionCount={video.count.collectionCount}
			/>
			<div
				onClick={() => {
					postVideoInteraction({
						videoId,
						type: 5,
						data: 1,
					});
					// 复制当前页面的url
					const input = document.createElement("input");
					input.value = window.location.href;
					document.body.appendChild(input);
					input.select();
					document.execCommand("copy");
					document.body.removeChild(input);
					toast.success("复制视频链接成功", {
						toastId: "copy_success",
					});
				}}
			>
				<VideoInteractionItem
					name='share_window'
					count={video.count.forwardCount}
				/>
			</div>
		</div>
	);
}
