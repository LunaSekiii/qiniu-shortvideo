import SVGIcon from "@/components/SVGIcon";
import style from "../VideoComment.module.scss";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { VideoContainerContext } from "@/components/VideoContainer";
import { postVideoComment } from "@/apis/comment";
import { toast } from "react-toastify";
import { VideoCommentContext } from "..";

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
export function CommentEditor({
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
