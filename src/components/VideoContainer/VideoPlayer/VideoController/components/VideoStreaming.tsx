import { useLayoutEffect, useState } from "react";
import style from "../VideoController.module.scss";
import BaseSwitch from "@/components/BaseSwitch";
import usePlayOptionStore from "@/stores/usePlayOptionStore";

/**
 * 视频连播开关
 */
export function VideoStreaming() {
	// TODO: 视频连播功能
	const [onCheck, setOnCheck] = useState(false);

	const setPlayOption = usePlayOptionStore((state) => state.setPlayOption);
	const playOption = usePlayOptionStore((state) => state.playOption);

	useLayoutEffect(() => {
		setOnCheck(playOption.playMode === 1);
	}, [playOption.playMode]);

	return (
		<div
			onClick={() => {
				setOnCheck(!onCheck);
				setPlayOption({ playMode: onCheck ? 0 : 1 });
			}}
			className={style.btn}
		>
			<div>连播</div>
			<BaseSwitch onCheck={onCheck} />
		</div>
	);
}
