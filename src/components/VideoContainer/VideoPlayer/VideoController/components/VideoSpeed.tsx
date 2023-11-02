import { useState, memo } from "react";
import style from "../VideoController.module.scss";

const speedList = [0.5, 1, 1.5, 2];

/**
 * 视频播放速度选择
 */
export const VideoSpeed = memo(function VideoSpeed({
	video,
}: {
	video: HTMLVideoElement;
}) {
	const [speed, setSpeed] = useState(video.playbackRate);
	return (
		<div>
			<div className={style.list}>
				{speedList
					.map((speed) => (
						<div
							key={speed}
							className={style.item}
							onClick={() => {
								video.playbackRate = speed;
								setSpeed(speed);
							}}
						>
							{speed}
						</div>
					))
					.reverse()}
			</div>
			<div className={style.current}>{speed}×</div>
		</div>
	);
});
