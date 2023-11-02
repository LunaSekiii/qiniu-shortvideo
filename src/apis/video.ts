import fetchService from "./fetchServer";

export type VideoListType = List<Video.VideoInfo>;

/**
 * 获取视频流
 */
export function getVideoListByCategory({
	categoryId: category,
	page,
	size = 10,
}: RequestType.getVideoListByCategoryProps) {
	return fetchService.get<VideoListType>(
		`/vs/video/category/${category}?page=${page}&size=${size}`
	);
}
