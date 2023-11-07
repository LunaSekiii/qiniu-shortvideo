import fetchService from "./fetchServer";

/** 评论列表类型 */
type CommentListType = List<CommentType.TopComment>;

/**
 * 获取视频评论列表
 */
export function getVideoCommentList({
	videoId,
	page,
	size = 10,
}: RequestType.getVideoCommentListParams) {
	return fetchService.get<CommentListType>(
		`/comment/api/page?videoId=${videoId}&page=${page}&pageSize=${size}`
	);
}

/**
 * 发布评论
 */
export function postVideoComment({
	videoId,
	commentContent,
	parentCommentId,
	topCommentId,
}: RequestType.postVideoCommentParams) {
	return fetchService.post<number>(
		`/comment/api/post`,
		JSON.stringify({
			videoId,
			commentContent,
			parentCommentId,
			topCommentId,
		})
	);
}

/**
 * 评论交互（点赞）
 */
export function getVideoCommentInteraction({
	commentId,
	interactionType,
}: RequestType.getVideoCommentInteractionParams) {
	return fetchService.get<string>(
		`/comment/api/favor?commentId=${commentId}&type=${interactionType}`
	);
}
