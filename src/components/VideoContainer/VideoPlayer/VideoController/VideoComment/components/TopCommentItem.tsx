import SVGIcon from "@/components/SVGIcon";
import style from "../VideoComment.module.scss";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { getVideoCommentInteraction } from "@/apis/comment";
import Avatar from "@/components/GlobalAvatar";
import { InteractionEnum } from "@/types/enums";
import { SubComment } from "./SubComment";
import { VideoCommentContext } from "..";

/**
 * 一级评论项
 */
export function TopCommentItem({
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
