import style from "./VideoInfo.module.scss";
import Avatar from "../../GlobalAvatar";
import { VideoSwitch } from "./components/VideoSwitch";
import { VideoInteraction } from "./components/VideoInteraction";

type VideoInfoProps = {
	video: VideoType.VideoInfo;
	isFullscreen: boolean;
};
/**
 * 视频信息
 */
export function VideoInfo(props: VideoInfoProps) {
	const { video, isFullscreen } = props;
	return (
		<div className={style["video-info"]} data-fullscreen={isFullscreen}>
			<div className={style["interaction-box"]}>
				<div className={style.user}>
					<Avatar
						styleConfig={{ width: "50px", height: "50px" }}
						userId={video.author.userId}
						avatarSrc={video.author.picture}
					/>
					<div className={style["user-info"]}>
						<h2 className={style["user-name"]}>
							{video.author.userName}
						</h2>
						{/* <p className={style.time}>3天前</p> */}
					</div>
				</div>
				<VideoInteraction video={video} />
			</div>
			<div className={style.info}>
				<h1>{video.thumbnail}</h1>
			</div>
			<VideoSwitch />
		</div>
	);
}
