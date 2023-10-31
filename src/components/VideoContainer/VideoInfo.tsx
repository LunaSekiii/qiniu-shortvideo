import style from "./VideoContainer.module.scss";
import Avatar from "../GlobalAvatar";
import SVGIcon, { SVGIconName } from "../SVGIcon";

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
			<div className={style["video-switch"]}>
				<div className={style["up-btn"]}>
					<SVGIcon name='arrow_upward' />
				</div>
				<div className={style["dowm-btn"]}>
					<SVGIcon name='arrow_downward' active />
				</div>
			</div>
		</div>
	);
}

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

function formatNumber(num: number, decimalPlaces: number = 1): string {
	// 判断数字的大小，进行格式化
	const units = ["k", "m", "b"];
	let formattedNum = "";
	let unitIndex = 0;

	while (num >= 1000) {
		if (unitIndex >= units.length) return "999b+";
		num /= 1000;
		formattedNum = units[unitIndex];
		unitIndex++;
	}

	return num.toFixed(decimalPlaces) + formattedNum;
}

function VideoInteractionItem({ name }: { name: SVGIconName }) {
	return (
		<div className={style["interaction-btn"]}>
			<SVGIcon name={name} />
			<p>{formatNumber(114514)}</p>
		</div>
	);
}
