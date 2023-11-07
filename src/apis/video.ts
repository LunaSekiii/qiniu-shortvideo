import fetchService from "./fetchServer";

export type VideoListType = List<VideoType.VideoInfo>;

/**
 * 获取视频流
 */
export function getVideoListByCategory({
	categoryId: category,
	page,
	size = 10,
}: RequestType.getVideoListByCategoryParams) {
	return fetchService.get<VideoListType>(
		`/api/vs/video/recommend?category=${category}&page=${page}&size=${size}`
	);
}

/**
 * 使用关键词搜索视频流
 */
export function getVideoListByKeyword({
	keyword,
	page,
	size = 10,
}: RequestType.getVideoListByKeywordParams) {
	return fetchService.get<VideoListType>(
		`/api/vs/search?key=${keyword}&page=${page}&size=${size}`
	);
}

/**
 * 视频交互(点赞\收藏)
 */
export function getVideoInteraction({
	videoId,
	operate,
}: RequestType.getVideoInteractionParams) {
	return fetchService.get<boolean>(
		`/api/vs/foot/favor/?videoId=${videoId}&operate=${operate}`
	);
}
