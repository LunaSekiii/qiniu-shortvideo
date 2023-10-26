import style from "./TheHeader.module.scss";
import UserInfo from "./UserInfo";

function TheHeader() {
	return (
		<div className={style.header}>
			<div className={style["search-box"]}>
				<input placeholder='请输入' />
			</div>
			<UserInfo />
		</div>
	);
}

export default TheHeader;
