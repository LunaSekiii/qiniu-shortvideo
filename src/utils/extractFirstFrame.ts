/**
 * 提取视频第一帧
 */
function extractFirstFrame(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const video = document.createElement("video");
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");

		video.addEventListener("loadedmetadata", () => {
			video.currentTime = 0; // 设置当前时间为第一帧
		});

		video.addEventListener("seeked", () => {
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			context?.drawImage(video, 0, 0, canvas.width, canvas.height);
			const dataUrl = canvas.toDataURL("image/jpeg");
			resolve(dataUrl);
		});

		video.addEventListener("error", (error) => {
			reject(error);
		});

		video.src = URL.createObjectURL(file);
		video.load();
	});
}

export default extractFirstFrame;
