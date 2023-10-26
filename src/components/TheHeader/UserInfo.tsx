import Avatar from "../Avatar";
import style from "./UserInfo.module.scss";

function UserInfo() {
	return (
		<div className={style["user-info"]}>
			<Avatar />
		</div>
	);
}

export default UserInfo;
