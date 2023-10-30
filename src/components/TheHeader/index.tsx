import { useId } from "react";
import SVGIcon from "../SVGIcon";
import style from "./TheHeader.module.scss";
import UserInfo from "./UserInfo";

function TheHeader() {
	return (
		<div className={style.header}>
			<SearchBox />
			<UserInfo />
		</div>
	);
}

function SearchBox() {
	const inputId = useId();
	return (
		<label htmlFor={inputId} className={style["search-box"]}>
			<SVGIcon name='search' />
			<input placeholder='搜索' type='text' id={inputId} />
		</label>
	);
}

export default TheHeader;
