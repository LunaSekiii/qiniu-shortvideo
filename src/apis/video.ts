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
