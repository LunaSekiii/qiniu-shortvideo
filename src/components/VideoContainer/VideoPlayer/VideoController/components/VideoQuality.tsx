import { useState, memo, useLayoutEffect } from "react";
import style from "../VideoController.module.scss";
import Hls from "hls.js";
import usePlayOptionStore from "@/stores/usePlayOptionStore";

/** 清晰度列表 */
const qualityList = ["极速", "流畅", "普通", "高清", "超清"];
/**
 * 清晰度选择
 */
export const VideoQuality = memo(function VideoQuality({ hls }: { hls: Hls }) {
	const videoLevels = hls.levels;
	const [level, setLevel] = useState(-1);

	const setPlayOption = usePlayOptionStore((state) => state.setPlayOption);
	const playOption = usePlayOptionStore((state) => state.playOption);

	// 画质切换（在下个缓存段切换）
	useLayoutEffect(() => {
		if (hls.nextLevel === level) return;
		hls.nextLevel = level;
	}, [hls, level, setPlayOption]);

	useLayoutEffect(() => {
		const maxLevel = videoLevels?.length - 1;
		setLevel(Math.min(playOption.playQuality, maxLevel));
	}, [playOption.playQuality, videoLevels?.length]);

	return (
		<div className={style["video-quality"]}>
			<div className={style.list}>
				{
					// 使用双重revers将清晰度倒序
					videoLevels
						?.reverse()
						.map((__, index) => (
							<div
								key={index}
								className={style.item}
								onClick={() => {
									setLevel(index);
									setPlayOption({ playQuality: index });
								}}
							>
								{qualityList[index]}
							</div>
						))
						.reverse()
				}
				<div
					className={style.item}
					onClick={() => {
						setLevel(-1);
						setPlayOption({ playQuality: -1 });
					}}
				>
					自动
				</div>
			</div>
			{level === -1 ? (
				<div className={style.current}>自动</div>
			) : (
				<div className={style.current}>{qualityList[level]}</div>
			)}
		</div>
	);
});
