import Avatar from "../GlobalAvatar";
import style from "./UserInfo.module.scss";

function UserInfo() {
	return (
		<div className={style["user-info"]}>
			<Avatar
				styleConfig={{
					width: "100%",
					height: "100%",
				}}
			/>
		</div>
	);
}

export default UserInfo;
