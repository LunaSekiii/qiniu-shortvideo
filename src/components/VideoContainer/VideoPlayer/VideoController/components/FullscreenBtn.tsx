import SVGIcon from "@/components/SVGIcon";
import { ListHandlerContext } from "@/components/VideoList";
import { useState, useContext, useEffect } from "react";
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

	const [onCheck, setOnCheck] = useState(
		document.fullscreenElement ? true : false
	);

	useEffect(() => {
		const handleFullscreenChange = () => {
			setOnCheck(document.fullscreenElement ? true : false);
		};
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => {
			document.removeEventListener(
				"fullscreenchange",
				handleFullscreenChange
			);
		};
	}, []);

	return (
		<div
			onClick={async () => {
				setOnCheck(await handleListFullScreen());
				// 延迟100ms
				await new Promise((resolve) => setTimeout(resolve, 50));
				currentContainerScrollIntoView();
			}}
			className={style.btn}
		>
			<SVGIcon name={onCheck ? "fullscreen_exit" : "fullscreen"} active />
		</div>
	);
}
