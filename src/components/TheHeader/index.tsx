import style from "./TheHeader.module.scss";
import UserInfo from "../TheUserInfoBar";
import { SearchBox } from "../TheSearchBox";

function TheHeader() {
	return (
		<div className={style.header}>
			<SearchBox />
			<UserInfo />
		</div>
	);
}

export default TheHeader;
