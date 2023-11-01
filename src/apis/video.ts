import fetchService from "./fetchServer";

/**
 * 获取视频流
 */
export function getVideoListByCategory({
	categoryId: category,
}: RequestType.getVideoListByCategoryProps) {
	return fetchService.get(`/api/video/category/${category}`);
}
