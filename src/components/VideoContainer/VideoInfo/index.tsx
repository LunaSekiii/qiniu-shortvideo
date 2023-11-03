import style from "./VideoInfo.module.scss";
import Avatar from "../../GlobalAvatar";
import SVGIcon, { SVGIconName } from "../../SVGIcon";
import { formatNumber } from "../../../utils/formatNumber";
import { VideoSwitch } from "./components/VideoSwitch";
import { useState } from "react";

type VideoInfoProps = {
	video: Video.VideoInfo;
};
/**
 * 视频信息
 */
export function VideoInfo(props: VideoInfoProps) {
	const { video } = props;
	return (
		<div className={style["video-info"]}>
			<div className={style["interaction-box"]}>
				<div className={style.user}>
					<Avatar styleConfig={{ width: "50px", height: "50px" }} />
					<div className={style["user-info"]}>
						<h2 className={style["user-name"]}>
							{video.author.userName}
						</h2>
						<p className={style.time}>3天前</p>
					</div>
				</div>
				<VideoInteraction video={video} />
			</div>
			<div className={style.info}>
				<h1>{video.title}</h1>
				<p>{video.thumbnail}</p>
			</div>
			<VideoSwitch />
		</div>
	);
}

/**
 * 视频交互组件
 */
function VideoInteraction(props: { video: Video.VideoInfo }) {
	const { video } = props;
	return (
		<div className={style.interaction}>
			<VideoParise
				parised={video.parised}
				pariseCount={video.count.praiseCount}
			/>
			<VideoInteractionItem name='chat' count={video.count.praiseCount} />
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

/**
 * 视频点赞组件
 */
function VideoParise({
	parised,
	pariseCount,
}: {
	parised: boolean;
	pariseCount: number;
}) {
	const [count, setCount] = useState(pariseCount);
	const [isParised, setIsParised] = useState(parised);
	return (
		<VideoInteractionItem
			name='favourite'
			count={count}
			active={isParised}
			onClick={() => {
				if (isParised) {
					setCount(count - 1);
				} else {
					setCount(count + 1);
				}
				setIsParised(!isParised);
			}}
		/>
	);
}

/**
 * 视频收藏组件
 */
function VideoCollection({
	collected,
	collectionCount,
}: {
	collected: boolean;
	collectionCount: number;
}) {
	const [count, setCount] = useState(collectionCount);
	const [isCollected, setIsCollected] = useState(collected);
	return (
		<VideoInteractionItem
			name='star'
			count={count}
			active={isCollected}
			onClick={() => {
				if (isCollected) {
					setCount(count - 1);
				} else {
					setCount(count + 1);
				}
				setIsCollected(!isCollected);
			}}
		/>
	);
}

/**
 * 视频交互组件子组件
 */
function VideoInteractionItem({
	name,
	count,
	active,
	onClick,
}: {
	name: SVGIconName;
	count: number;
	active?: boolean;
	onClick?: () => void;
}) {
	return (
		<div className={style["interaction-btn"]} onClick={onClick}>
			<SVGIcon name={name} active={active} />
			<p>{formatNumber(count)}</p>
		</div>
	);
}
