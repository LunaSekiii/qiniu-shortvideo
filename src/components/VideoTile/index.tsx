import { useCallback } from "react";
import style from "./VideoTile.module.scss";
import { useNavigate } from "react-router-dom";

/**
 * 视频平铺组件
 */
function VideoTile(props: VideoType.VideoFlowProps) {
	const { data, getData, resetData } = props;
	getData();
	return (
		<div className={style["video-tile"]}>
			{data.map((item, index: number) => {
				return (
					<VideoTileItem
						key={index}
						video={item}
						isLast={index === data.length - 1}
					/>
				);
			})}
		</div>
	);
}

function VideoTileItem({
	video,
	isLast = false,
}: {
	video: VideoType.VideoInfo;
	isLast?: boolean;
}) {
	const navigate = useNavigate();
	// 使用元素可见性api，为最后一个元素添加观察者
	// 当最后一个元素出现在视口时，触发加载更多
	const lastElementRef = useCallback(
		(node: HTMLDivElement) => {
			if (isLast) {
				const observer = new IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							console.log("触发加载更多");
							// 触发一次后取消观察
							observer.unobserve(entry.target);
						}
					});
				});
				if (node) observer.observe(node);
			}
		},
		[isLast]
	);
	return (
		<div
			className={style["video-tile-item"]}
			ref={lastElementRef}
			onClick={() => {
				console.log("点击视频");
			}}
		>
			<div className={style.show}>
				<img
					draggable={false}
					src={"http://" + video.picture}
					alt='cover'
				/>
			</div>
			<div className={style.info}>
				<div className={style.title}>{video.thumbnail}</div>
				<div className={style.else}>
					<div
						className={style.author}
						onClick={(e) => {
							e.stopPropagation();
							navigate("/user/" + video.author.userId);
						}}
					>
						@ {video.author.userName}
					</div>
				</div>
			</div>
		</div>
	);
}

export default VideoTile;
