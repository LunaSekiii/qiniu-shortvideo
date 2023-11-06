import style from "./VideoInteraction.module.scss";
import { VideoParise } from "./components/VideoParise";
import { VideoCollection } from "./components/VideoCollection";
import { VideoInteractionItem } from "./components/VideoInteractionItem";

/**
 * 视频交互组件
 */
export function VideoInteraction(props: { video: VideoType.VideoInfo }) {
	const { video } = props;
	return (
		<div className={style.interaction}>
			<VideoParise
				parised={video.parised}
				pariseCount={video.count.praiseCount}
			/>
			<VideoInteractionItem
				name='chat'
				count={video.count.commentCount}
			/>
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
