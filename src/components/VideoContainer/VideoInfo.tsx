import style from "./VideoContainer.module.scss";
import Avatar from "../GlobalAvatar";
import SVGIcon from "../SVGIcon";

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
				<div className={style.interaction}>
					<VideoInteraction />
					<VideoInteraction />
					<VideoInteraction />
					<VideoInteraction />
				</div>
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
					<SVGIcon name='favourite' />
				</div>
				<div className={style["dowm-btn"]}>
					<SVGIcon name='favourite' />
				</div>
			</div>
		</div>
	);
}

function VideoInteraction() {
	return (
		<div className={style["interaction-btn"]}>
			<SVGIcon name='favourite' />
			<p>1145</p>
		</div>
	);
}
