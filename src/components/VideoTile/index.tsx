import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import style from "./VideoTile.module.scss";
import { useNavigate } from "react-router-dom";
import { VideoList } from "../VideoList";
import SVGIcon from "../SVGIcon";

/**
 * 视频平铺组件
 */
function VideoTile(
	props: VideoType.VideoFlowProps & {
		isShare?: boolean;
	}
) {
	const { data, getData, resetData, updateData, isShare = false } = props;
	const hasMore = useRef(true);

	useEffect(() => {
		getData().then((data) => {
			if (data.length === 0) hasMore.current = false;
		});
	}, [getData]);

	const getNextData = useCallback(async () => {
		if (!hasMore) return [];
		const nextData = await getData();
		if (nextData.length === 0) hasMore.current = false;
		return nextData;
	}, [getData]);

	const [listCurrentIndex, setListCurrentIndex] = useState(-1);

	useEffect(() => {
		if (isShare) setListCurrentIndex(0);
	}, []);

	return (
		<>
			{listCurrentIndex === -1 ? (
				<div className={style["video-tile"]}>
					{data.map((item, index: number) => {
						return (
							<VideoTileItem
								key={index}
								video={item}
								getData={getNextData}
								isLast={index === data.length - 1}
								index={index}
								openVideo={setListCurrentIndex}
							/>
						);
					})}
					{hasMore ? (
						<div className={style["loading"]}>加载中...</div>
					) : (
						<div className={style["loading"]}>没有更多了</div>
					)}
				</div>
			) : (
				<div className={style["list-view"]}>
					<div
						className={style.close}
						onClick={() => {
							setListCurrentIndex(-1);
						}}
					>
						<SVGIcon name='close' />
					</div>
					<VideoList
						data={data}
						getData={getNextData}
						resetData={resetData}
						updateData={updateData}
						initIndex={listCurrentIndex}
					/>
				</div>
			)}
		</>
	);
}

function VideoTileItem({
	video,
	getData,
	index,
	openVideo,
	isLast = false,
}: {
	video: VideoType.VideoInfo;
	getData: () => void;
	index: number;
	openVideo: (index: number) => void;
	isLast?: boolean;
}) {
	const navigate = useNavigate();
	const videoItemRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		// 使用元素可见性api，为最后一个元素添加观察者
		// 当最后一个元素出现在视口时，触发加载更多
		if (!isLast) return;
		const videoItem = videoItemRef.current;
		if (!videoItem) return;
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					console.log("触发加载更多");
					getData();
					// 触发一次后取消观察
					observer.unobserve(entry.target);
				}
			});
		});
		observer.observe(videoItem);
		return () => {
			observer.unobserve(videoItem);
			observer.disconnect();
		};
	}, [getData, isLast]);

	return (
		<div
			className={style["video-tile-item"]}
			ref={videoItemRef}
			onClick={() => {
				console.log("点击视频");
				openVideo(index);
			}}
		>
			<div className={style.show}>
				<img
					draggable={false}
					src={
						video.picture.startsWith("http://")
							? video.picture
							: "http://" + video.picture
					}
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
