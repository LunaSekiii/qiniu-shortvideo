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
					// 以当前页面的url域名为基础，拼接视频id
					const url = window.location.origin + "/video/" + videoId;
					// 创建一个input标签
					const input = document.createElement("input");
					// 将input标签的value设置为url
					input.value = url;
					// 将input标签添加到页面中
					document.body.appendChild(input);
					// 选中input标签的内容
					input.select();
					// 复制选中的内容
					document.execCommand("copy");
					// 删除input标签
					document.body.removeChild(input);
					// 弹出提示
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
