import style from "./VideoContainer.module.scss";
import Avatar from "../GlobalAvatar";
import SVGIcon, { SVGIconName } from "../SVGIcon";
import { formatNumber } from "../../utils/formatNumber";
import { useContext } from "react";
import { ListHandlerContext } from "@/pages/Main";

/**
 * 视频信息
 */
export function VideoInfo() {
	return (
		<div className={style["video-info"]}>
			<div className={style["interaction-box"]}>
				<div className={style.user}>
					<Avatar styleConfig={{ width: "50px", height: "50px" }} />
					<div className={style["user-info"]}>
						<h2 className={style["user-name"]}>发布者</h2>
						<p className={style.time}>3天前</p>
					</div>
				</div>
				<VideoInteraction />
			</div>
			<div className={style.info}>
				<h1>Title</h1>
				<p>
					forum sssdsad sad asd asasd asd asd asd asd sssd sssss aaaaa
					bbb ccccc ddd wew qwe qww q21321213 ewqe wdwd wdwq d qwd wqd
					wqd wqd qd sd sad sad as d w d akd ksad aks dksad ksa dksad
					ksad
				</p>
			</div>
			<VideoSwitch />
		</div>
	);
}

/**
 * 视频切换按钮
 */
function VideoSwitch() {
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

/**
 * 视频交互组件
 */
function VideoInteraction() {
	return (
		<div className={style.interaction}>
			<VideoInteractionItem name='favourite' />
			<VideoInteractionItem name='chat' />
			<VideoInteractionItem name='star' />
			<VideoInteractionItem name='share_window' />
		</div>
	);
}

/**
 * 视频交互组件子组件
 */
function VideoInteractionItem({ name }: { name: SVGIconName }) {
	return (
		<div className={style["interaction-btn"]}>
			<SVGIcon name={name} />
			<p>{formatNumber(114514)}</p>
		</div>
	);
}
