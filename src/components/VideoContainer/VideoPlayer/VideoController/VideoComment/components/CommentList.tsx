import style from "../VideoComment.module.scss";
import { TopCommentItem } from "./TopCommentItem";

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
export function CommentList(prosp: CommentListProps) {
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
