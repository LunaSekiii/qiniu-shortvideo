import style from "./VideoInteraction.module.scss";
import { VideoParise } from "./components/VideoParise";
import { VideoCollection } from "./components/VideoCollection";
import { VideoInteractionItem } from "./components/VideoInteractionItem";
import { useContext } from "react";
import { VideoContainerContext } from "@/components/VideoContainer";

/**
 * 视频交互组件
 */
export function VideoInteraction(props: { video: VideoType.VideoInfo }) {
	const { video } = props;
	const { setIsCommentOpen } = useContext(VideoContainerContext);
	return (
		<div className={style.interaction}>
			<VideoParise
				praised={video.praised}
				pariseCount={video.count.praiseCount}
			/>
			<div
				onClick={() => {
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
			<VideoInteractionItem
				name='share_window'
				count={video.count.forwardCount}
			/>
		</div>
	);
}
