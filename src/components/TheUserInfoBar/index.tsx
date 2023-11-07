import useLoginStore from "@/stores/useLoginStore";
import Avatar from "../GlobalAvatar";
import style from "./UserInfo.module.scss";
import SVGIcon from "../SVGIcon";
import { UserNotification } from "./components/UserNotification";
import Dropdown from "../BaseDropdown";
import { useNavigate } from "react-router-dom";

function UserInfo() {
	const userInfo = useLoginStore((state) => state.userInfo);
	return (
		<div className={style["user-info"]}>
			<div className={`${style.item} ${style.avatar}`}>
				<Dropdown
					label={
						<Avatar
							styleConfig={{
								width: "100%",
								aspectRatio: 1,
							}}
							avatarSrc={userInfo?.picture}
						/>
					}
				>
					<UserOperation />
				</Dropdown>
			</div>

			<div className={style.item}>
				<Dropdown label={<SVGIcon name='notifications' />}>
					<UserNotification />
				</Dropdown>
			</div>
		</div>
	);
}

function UserOperation() {
	const userInfo = useLoginStore((state) => state.userInfo);
	const logout = useLoginStore((state) => state.logout);
	const navigate = useNavigate();
	if (!userInfo) return null;
	return (
		<div className={style.wrapper}>
			<div className={style.main}>
				<div className={style.item} onClick={() => logout()}>
					登出
				</div>
				<div
					className={style.item}
					onClick={() => {
						navigate("/setting");
					}}
				>
					设置
				</div>
			</div>
		</div>
	);
}
export default UserInfo;
