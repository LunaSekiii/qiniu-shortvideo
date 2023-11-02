import SVGIcon from "@/components/SVGIcon";
import { useState, useLayoutEffect } from "react";
import style from "../VideoController.module.scss";

/**
 * 视频音量控制
 */
export function VideoVolume({ video }: { video: HTMLVideoElement }) {
	const [volume, setVolume] = useState(video.volume);
	const [isMute, setIsMute] = useState(video.muted);

	// 音量绑定
	useLayoutEffect(() => {
		const volumeListener = () => {
			setVolume(video.volume);
		};
		video.addEventListener("volumechange", volumeListener);
		return () => {
			video.removeEventListener("volumechange", volumeListener);
		};
	}, [video, volume]);

	// 静音状态绑定
	useLayoutEffect(() => {
		video.muted = isMute;
	}, [isMute, video]);

	/** 音量条拖拽事件 */
	const volumeBarDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (isMute) return;
		e.stopPropagation();
		e.preventDefault();
		const volumeBar = e.currentTarget;
		// 给音量条设置html属性标记
		volumeBar.setAttribute("data-drag", "true");
		// 获取音量条的位置信息
		const volumeBarClientRect = volumeBar.getBoundingClientRect();
		// 计算当前点击位置百分比
		const percent =
			1 -
			(e.clientY - volumeBarClientRect.top) / volumeBarClientRect.height;
		video.volume = percent;
		// 注册全局拖拽事件
		const mouseMoveListener = (e: MouseEvent) => {
			const percent =
				1 -
				(e.clientY - volumeBarClientRect.top) /
					volumeBarClientRect.height;

			video.volume = percent > 1 ? 1 : percent < 0 ? 0 : percent;
		};
		const mouseUpListener = () => {
			// 清除音量条html属性标记
			volumeBar.removeAttribute("data-drag");
			document.removeEventListener("mousemove", mouseMoveListener);
			document.removeEventListener("mouseup", mouseUpListener);
		};
		document.addEventListener("mousemove", mouseMoveListener);
		document.addEventListener("mouseup", mouseUpListener);
	};

	return (
		<div className={style.volume}>
			<div
				className={style.current}
				onClick={() => {
					setIsMute((isMute) => !isMute);
				}}
			>
				<SVGIcon
					name={
						isMute
							? "volume_off"
							: volume == 0
							? "volume_mute"
							: volume >= 0.5
							? "volume_up"
							: "volume_down_alt"
					}
					active
				/>
			</div>
			<div className={style.list}>
				<div
					className={style["volume-bar"]}
					onMouseDownCapture={volumeBarDrag}
				>
					<div
						className={style["volume-bar-inner"]}
						style={{
							transform: `translateY(${(1 - volume) * 100}%)`,
						}}
						data-mute={isMute}
					/>
				</div>
			</div>
		</div>
	);
}
