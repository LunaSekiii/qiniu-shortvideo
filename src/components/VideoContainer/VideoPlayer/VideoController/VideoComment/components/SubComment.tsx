import style from "../VideoComment.module.scss";
import { useContext } from "react";
import { VideoCommentContext } from "..";

/**
 * 二级评论项
 */
export function SubComment({
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
