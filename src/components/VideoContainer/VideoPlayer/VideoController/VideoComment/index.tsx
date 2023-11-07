import style from "./VideoComment.module.scss";
import {
	createContext,
	memo,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { VideoContainerContext } from "@/components/VideoContainer";
import { getVideoCommentList } from "@/apis/comment";
import useLoadPerPage from "@/hooks/useLoadPerPage";
import { CommentList } from "./components/CommentList";
import { CommentEditor } from "./components/CommentEditor";

export const VideoCommentContext = createContext<{
	setReply: React.Dispatch<
		React.SetStateAction<{
			topCommentId?: number | undefined;
			parentCommentId?: number | undefined;
			replyContent?: string | undefined;
		}>
	>;
}>({
	setReply: () => {},
});

/**
 * 视频评论区
 */
const VideoComment = memo(function VideoComment() {
	const { videoId } = useContext(VideoContainerContext);
	// 全局回复参数
	const [reply, setReply] = useState<{
		topCommentId?: number;
		parentCommentId?: number;
		replyContent?: string;
	}>({
		topCommentId: undefined,
		parentCommentId: undefined,
		replyContent: undefined,
	});
	const { isCommentOpen } = useContext(VideoContainerContext);

	const loadData = useCallback(
		(page: number, pageSize: number) =>
			getVideoCommentList({
				videoId,
				page,
				size: pageSize,
			}),
		[videoId]
	);

	const { data, getData, reset } = useLoadPerPage({ loadData });

	useEffect(() => {
		getData();
	}, [getData]);
	console.log(data, videoId);
	return (
		<div
			className={style["comment-box"]}
			onClick={(e) => {
				console.log("comment-box");
				e.stopPropagation();
			}}
			data-visible={isCommentOpen}
			tabIndex={0}
		>
			<VideoCommentContext.Provider value={{ setReply }}>
				<div className={style.main}>
					<CommentList data={data} getData={getData} />
					<CommentEditor videoId={videoId} reset={reset} {...reply} />
				</div>
			</VideoCommentContext.Provider>
		</div>
	);
});

export default VideoComment;
