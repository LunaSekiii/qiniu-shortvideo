import { useRef } from "react";
import style from "./Upload.module.scss";
import extractFirstFrame from "@/utils/extractFirstFrame";
import dataURLtoFile from "@/utils/dataURLtoFile";
import { postUploadImg } from "@/apis/upload";

/**
 * 视频上传组件
 */
export function VideoUpload({
	setVideo,
	setCover,
}: {
	setVideo: React.Dispatch<React.SetStateAction<File | undefined>>;
	setCover: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	// 当选择视频文件时，将视频文件转换为视频流，然后将视频流赋值给video标签
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// 提取视频第一帧作为封面
			extractFirstFrame(file).then(async (blob) => {
				// 将blob转换为file
				const img = dataURLtoFile(blob, "firstFrame.png");
				const imgURL = await postUploadImg(img);
				setCover("http://" + imgURL);
			});
			setVideo(file);
			const video = videoRef.current;
			const videoURL = URL.createObjectURL(file);
			if (video) {
				video.src = videoURL;
			}
		}
	};

	return (
		<div className={style.video}>
			<video controls ref={videoRef} />
			<input
				type='file'
				accept='video/*'
				multiple={false}
				onChange={handleFileChange}
				ref={inputRef}
				hidden
			/>
			{/* 视频遮罩 */}
			<div
				className={style.mask}
				onClick={() => {
					if (inputRef.current) {
						inputRef.current.click();
					}
				}}
			>
				选择视频
			</div>
		</div>
	);
}
