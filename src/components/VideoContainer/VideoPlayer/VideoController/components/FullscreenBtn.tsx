import SVGIcon from "@/components/SVGIcon";
import { ListHandlerContext } from "@/pages/Main";
import { useState, useContext } from "react";
import { VideoContainerContext } from "../../..";
import style from "../VideoController.module.scss";

/**
 * 全屏按钮
 */
export function FullscreenBtn() {
	// 上下文提取
	const { handleListFullScreen } = useContext(ListHandlerContext);
	const { currentContainerScrollIntoView } = useContext(
		VideoContainerContext
	);

	const [onCheck, setOnCheck] = useState(false);

	return (
		<div
			onClick={async () => {
				setOnCheck(await handleListFullScreen());
				currentContainerScrollIntoView();
			}}
			className={style.btn}
		>
			<SVGIcon name={onCheck ? "fullscreen_exit" : "fullscreen"} active />
		</div>
	);
}
