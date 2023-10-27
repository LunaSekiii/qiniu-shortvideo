import Avatar from "../GlobalAvatar";
import style from "./UserInfo.module.scss";

function UserInfo() {
	return (
		<div className={style["user-info"]}>
			<Avatar />
		</div>
	);
}

export default UserInfo;
