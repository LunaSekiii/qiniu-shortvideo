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
		`/api/vs/video/category/${category}?page=${page}&size=${size}`
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
