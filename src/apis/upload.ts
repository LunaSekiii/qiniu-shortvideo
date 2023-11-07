import fetchService from "./fetchServer";

/**
 * 上传图片
 */
export function postUploadImg(file: File) {
	// 转换为FormData
	const formData = new FormData();
	formData.append("file", file);
	return fetchService.post<string>("/api/vs/video/image/upload", formData);
}
