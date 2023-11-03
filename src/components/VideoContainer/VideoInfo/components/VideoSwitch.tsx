import style from "../VideoInfo.module.scss";
import SVGIcon from "../../../SVGIcon";
import { useContext } from "react";
import { ListHandlerContext } from "@/components/VideoList";

/**
 * 视频切换按钮
 */
export function VideoSwitch() {
	const { handleListScroll: handlerListScroll } =
		useContext(ListHandlerContext);
	return (
		<div className={style["video-switch"]}>
			<div
				className={style["up-btn"]}
				onClick={() => handlerListScroll("up")}
			>
				<SVGIcon name='arrow_upward' />
			</div>
			<div
				className={style["dowm-btn"]}
				onClick={() => handlerListScroll("down")}
			>
				<SVGIcon name='arrow_downward' active />
			</div>
		</div>
	);
}
