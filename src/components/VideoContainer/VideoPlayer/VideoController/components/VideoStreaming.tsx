import { useState } from "react";
import style from "../VideoController.module.scss";
import BaseSwitch from "@/components/BaseSwitch";

/**
 * 视频连播开关
 */
export function VideoStreaming() {
	// TODO: 视频连播功能
	const [onCheck, setOnCheck] = useState(false);
	return (
		<div
			onClick={() => {
				setOnCheck(!onCheck);
			}}
			className={style.btn}
		>
			<div>连播</div>
			<BaseSwitch onCheck={onCheck} />
		</div>
	);
}
