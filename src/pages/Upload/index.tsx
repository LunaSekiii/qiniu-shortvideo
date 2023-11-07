import { useState } from "react";
import style from "./Upload.module.scss";
import { VideoUpload } from "./VideoUpload";
import { VideoInfoEditor } from "./VideoInfoEditor";
import { toast } from "react-toastify";
import { postUploadVideo } from "@/apis/upload";

/**
 * 视频上传页面
 */
function Upload() {
	const [video, setVideo] = useState<File>();
	const [cover, setCover] = useState<string>();
	const [title, setTitle] = useState<string>("");
	// 已选标签数组
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	/**
	 * 视频上传事件
	 */
	const handleUpload = () => {
		// 校验
		if (!video)
			return toast.error("请先上传视频", {
				toastId: "upload",
			});
		if (!cover)
			return toast.error("请先上传封面", {
				toastId: "upload",
			});
		if (!title)
			return toast.error("请先填写标题", {
				toastId: "upload",
			});

		// 校验通过，上传视频
		const uploadId = toast.loading("上传中...", {
			toastId: "upload",
		});
		postUploadVideo(
			{
				picture: cover,
				title,
				thumbnail:
					title +
					" " +
					selectedTags.map((tag) => `#${tag}`).join(" "),
			},
			video
		)
			.then(() => {
				toast.update(uploadId, {
					render: "上传成功",
					type: "success",
					toastId: "upload",
					autoClose: 2000,
				});
				// 回到用户主页
				setTimeout(() => {
					window.location.href = "/user";
				}, 1000);
			})
			.catch(() => {
				toast.update(uploadId, {
					render: "上传失败",
					type: "error",
					toastId: "upload",
					autoClose: 2000,
				});
			});
	};

	return (
		<div className={style.upload}>
			<h1>视频上传</h1>
			<hr />
			<VideoUpload setVideo={setVideo} setCover={setCover} />
			<div className={style.info}>
				<VideoInfoEditor
					title={title}
					setTitle={setTitle}
					selectedTags={selectedTags}
					setSelectedTags={setSelectedTags}
				/>

				<div className={style.sub}>
					<CoverPreview cover={cover} />
					<div className={style.btn} onClick={handleUpload}>
						上传
					</div>
				</div>
			</div>
		</div>
	);
}

export type VideoInfoEditorProps = {
	title: string;
	setTitle: (title: string) => void;
	selectedTags: string[];
	setSelectedTags: (tags: string[]) => void;
};

/**
 * 视频封面展示
 */
function CoverPreview({ cover }: { cover: string | undefined }) {
	return (
		<div className={style.cover}>
			{cover ? <img src={cover} alt='视频封面' /> : null}
		</div>
	);
}

export default Upload;
