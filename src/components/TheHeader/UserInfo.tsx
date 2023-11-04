import useLoginStore from "@/stores/useLoginStore";
import Avatar from "../GlobalAvatar";
import style from "./UserInfo.module.scss";

function UserInfo() {
	const userInfo = useLoginStore((state) => state.userInfo);
	return (
		<div className={style["user-info"]}>
			<Avatar
				styleConfig={{
					width: "100%",
					height: "100%",
				}}
				avatarSrc={userInfo?.picture}
			/>
		</div>
	);
}

export default UserInfo;
