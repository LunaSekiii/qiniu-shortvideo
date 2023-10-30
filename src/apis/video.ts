import fetchService from "./fetchServer";

/**
 * 获取视频流
 */
export function getVideoList(category: string) {
	return fetchService.get(`/api/video/category/${category}`);
}
