import fetchService from "./fetchServer";

/**
 * 上传图片
 */
export function postUploadImg(file: File) {
	// 转换为FormData
	const formData = new FormData();
	formData.append("file", file);
	return fetchService.post<string>("/video/image/upload", formData);
}

/**
 * 上传视频时标签推荐
 */
export function getVideoTagRecommend(title: string) {
	return fetchService.get<string[]>(`/video/tags/recommend?key=${title}`);
}

/**
 * 上传视频接口
 */
export function postUploadVideo(
	info: {
		title: string;
		thumbnail: string;
		picture: string;
	},
	video: File
) {
	// 转换为FormData
	const formData = new FormData();
	formData.append("file", video);
	formData.append("json", JSON.stringify(info));
	return fetchService.post<string>("/video/upload", formData);
}
