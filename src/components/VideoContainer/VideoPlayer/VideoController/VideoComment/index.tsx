import SVGIcon from "@/components/SVGIcon";
import style from "./VideoComment.module.scss";
import {
	createContext,
	memo,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { VideoContainerContext } from "@/components/VideoContainer";
import {
	getVideoCommentInteraction,
	getVideoCommentList,
	postVideoComment,
} from "@/apis/comment";
import useLoadPerPage from "@/hooks/useLoadPerPage";
import Avatar from "@/components/GlobalAvatar";
import { toast } from "react-toastify";
import { InteractionEnum } from "@/types/enums";

const VideoCommentContext = createContext<{
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

/**
 * 评论编辑器参数
 */
type CommentEditorProps = Omit<
	RequestType.postVideoCommentParams,
	"commentContent"
> & {
	reset: () => void;
	replyContent?: string;
};

/**
 * 评论编辑器
 */
function CommentEditor({
	videoId,
	parentCommentId,
	topCommentId,
	reset,
	replyContent,
}: CommentEditorProps) {
	const [content, setContent] = useState("");
	const { setReply } = useContext(VideoCommentContext);
	const commentRef = useRef<HTMLTextAreaElement>(null);
	useLayoutEffect(() => {
		if (commentRef.current && topCommentId && parentCommentId) {
			commentRef.current.focus();
		}
	}, [topCommentId, parentCommentId]);

	const { setIsCommentOpen } = useContext(VideoContainerContext);
	/**
	 * 发布评论
	 */
	const postComment = async () => {
		//  评论内容为空时不发送请求
		if (!content)
			return toast.error("评论内容不能为空", {
				toastId: "comment-empty",
			});
		try {
			await postVideoComment({
				videoId,
				parentCommentId,
				topCommentId,
				commentContent: content,
			});
			reset();
		} catch (e) {
			console.log(e);
		} finally {
			setContent("");
		}
	};

	return (
		<div className={style["comment-editor"]}>
			{replyContent ? (
				<div className={style["reply-info"]}>
					<span>回复{`>`}</span>
					<span className={style["reply-content"]}>
						{replyContent}
					</span>
					<span
						className={style["cancel-reply"]}
						onClick={() => {
							setReply({
								topCommentId: undefined,
								parentCommentId: undefined,
								replyContent: undefined,
							});
						}}
					>
						取消
					</span>
				</div>
			) : null}
			<textarea
				name=''
				id=''
				maxLength={200}
				value={content}
				onChange={(e) => {
					setContent(e.target.value);
				}}
				ref={commentRef}
				placeholder='说点什么吧...'
			/>
			<div className={style["btn-bar"]}>
				<div
					className={style.btn}
					onClick={() => setIsCommentOpen(false)}
				>
					<SVGIcon name='arrow_downward' />
					关闭
				</div>
				<div
					className={style.btn}
					data-active={true}
					onClick={postComment}
				>
					<SVGIcon name='arrow_upward' />
					评论
				</div>
			</div>
		</div>
	);
}

type CommentListProps = {
	data: CommentType.TopComment[];
	getData: (
		page?: number,
		pageSize?: number
	) => Promise<CommentType.TopComment[]>;
};

/**
 * 评论列表
 */
function CommentList(prosp: CommentListProps) {
	const { data, getData } = prosp;

	return (
		<div
			className={style["comment-list"]}
			tabIndex={-1}
			onWheelCapture={(e) => {
				if (
					e.currentTarget.scrollHeight -
						e.currentTarget.scrollTop -
						e.currentTarget.offsetHeight <=
						0 &&
					e.deltaY > 0
				) {
					//
				} else e.stopPropagation();
			}}
		>
			{data.map((comment, index) => (
				<TopCommentItem
					key={comment.commentId}
					comment={comment}
					isLast={index === data.length - 1}
					getData={getData}
				/>
			))}
		</div>
	);
}

/**
 * 一级评论项
 */
function TopCommentItem({
	comment,
	getData,
	isLast = false,
}: {
	comment: CommentType.TopComment;
	getData: (
		page?: number,
		pageSize?: number
	) => Promise<CommentType.TopComment[]>;
	isLast?: boolean;
}) {
	const { setReply } = useContext(VideoCommentContext);

	const [isPraised, setIsPraised] = useState(comment.praised);
	const [praiseCount, setPraiseCount] = useState(comment.praiseCount);

	// 如果当前是最后的元素，就添加可见区域监听
	const commentRef = useRef<HTMLDivElement>(null);
	useLayoutEffect(() => {
		if (isLast && commentRef.current) {
			const observer = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					getData();
				}
			});
			observer.observe(commentRef.current);
			return () => {
				observer.disconnect();
			};
		}
	}, [isLast, commentRef, getData]);

	return (
		<div className={style["top-comment"]} ref={commentRef}>
			<div className={style["user-info"]}>
				<Avatar
					avatarSrc={comment.userPhoto}
					userId={comment.userId}
					styleConfig={{ width: "2rem", height: "2rem" }}
				/>
				<a href={`/user/${comment.userId}`}>{comment.userName}</a>
			</div>
			<div>{comment.commentContent}</div>
			<div className={style.interaction}>
				<div
					onClick={async () => {
						try {
							await getVideoCommentInteraction({
								commentId: comment.commentId,
								interactionType: isPraised
									? InteractionEnum.unpraise
									: InteractionEnum.praise,
							});
						} catch (e) {
							console.log(e);
						}

						if (isPraised) {
							setPraiseCount(praiseCount - 1);
						} else {
							setPraiseCount(praiseCount + 1);
						}
						setIsPraised(!isPraised);
					}}
				>
					<SVGIcon name='favourite' active={isPraised} />
					<span>{praiseCount}</span>
				</div>
				<div
					onClick={() => {
						setReply({
							topCommentId: comment.commentId,
							parentCommentId: comment.commentId,
							replyContent:
								comment.userName +
								": " +
								comment.commentContent,
						});
					}}
				>
					<SVGIcon name='chat' />
				</div>
			</div>
			{comment.childComments.length > 0 ? (
				<div className={style["sub-comment"]}>
					{comment.childComments.map((childComment) => (
						<SubComment
							key={childComment.commentId}
							comment={childComment}
							topCommentId={comment.commentId}
						/>
					))}
				</div>
			) : null}
		</div>
	);
}

/**
 * 二级评论项
 */
function SubComment({
	comment,
	topCommentId,
}: {
	comment: CommentType.SubComment;
	topCommentId: number;
}) {
	const { setReply } = useContext(VideoCommentContext);
	return (
		<div>
			<div className={style["simple-sub-comment"]}>
				<a href={`/user/${comment.userId}`}>{comment.userName}:</a>
				<span>{comment.commentContent}</span>
				<span
					onClick={() => {
						setReply({
							topCommentId: topCommentId,
							parentCommentId: comment.commentId,
							replyContent:
								comment.userName +
								": " +
								comment.commentContent,
						});
					}}
				>
					回复
				</span>
			</div>
			{comment.parentContent ? (
				<div className={style["parent-comment"]}>
					"{comment.parentContent}"
				</div>
			) : null}
		</div>
	);
}

export default VideoComment;
