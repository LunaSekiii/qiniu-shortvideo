import { useEffect, useState } from "react";
import style from "./Upload.module.scss";
import { getVideoTagRecommend } from "@/apis/upload";
import SVGIcon from "@/components/SVGIcon";
import { VideoInfoEditorProps } from ".";

/**
 * 视频信息编辑器
 */
export function VideoInfoEditor({
	title,
	setTitle,
	selectedTags,
	setSelectedTags,
}: VideoInfoEditorProps) {
	// 待选标签数组
	const [tagsToBeSelected, setTagsToBeSelected] = useState<string[]>([]);

	// 对title的修改做防抖处理，并在修改后更新待选标签数组
	useEffect(() => {
		if (title === "") return;
		const timer = setTimeout(async () => {
			const tags = await getVideoTagRecommend(title);
			setSelectedTags([]);
			setTagsToBeSelected(tags);
		}, 1000);
		return () => clearTimeout(timer);
	}, [setSelectedTags, title]);

	return (
		<div className={style.editor}>
			<div className={style.title}>
				<input
					type='text'
					placeholder='视频标题'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>

			<div className={style.tags}>
				{selectedTags.length === 0 && tagsToBeSelected.length === 0 ? (
					<div>视频标签</div>
				) : null}
				{selectedTags.map((tag) => (
					<span
						key={tag}
						className={style.tag}
						data-selected={true}
						onClick={() => {
							setSelectedTags(
								selectedTags.filter((t) => t !== tag)
							);
							setTagsToBeSelected([...tagsToBeSelected, tag]);
						}}
					>
						{tag}
						<SVGIcon name='close' />
					</span>
				))}
				{tagsToBeSelected.map((tag) => (
					<span
						key={tag}
						className={style.tag}
						onClick={() => {
							setSelectedTags([...selectedTags, tag]);
							setTagsToBeSelected(
								tagsToBeSelected.filter((t) => t !== tag)
							);
						}}
					>
						{tag}
					</span>
				))}
			</div>
		</div>
	);
}
