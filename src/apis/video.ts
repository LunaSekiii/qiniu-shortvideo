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
		`/video/recommend?${
			category !== -1 ? `category=${category}` : ""
		}&page=${page}&size=${size}`
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
		`/search?key=${keyword}&page=${page}&size=${size}`
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
		`/foot/favor/?videoId=${videoId}&operate=${operate}`
	);
}

/**
 * 视频埋点
 */
export function postVideoInteraction(params: {
	videoId: number;
	type: number;
	data: number;
}) {
	return fetchService.post<string>(
		"/video/interaction",
		JSON.stringify(params)
	);
}

/**
 * 获取视频详情
 */
export function getVideoDetail(videoId: number) {
	return fetchService.get<{
		video: VideoType.VideoInfo;
	}>(`/video/detail/${videoId}`);
}
