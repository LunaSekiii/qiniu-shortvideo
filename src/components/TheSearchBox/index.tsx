import { useId, useState } from "react";
import SVGIcon from "../SVGIcon";
import style from "./SearchBox.module.scss";
import { useNavigate } from "react-router-dom";

/**
 * 搜索框
 */
export function SearchBox() {
	const inputId = useId();

	const currentPath = window.location.pathname;
	// 对currentPath进行url解码
	const decodedCurrentPath = decodeURIComponent(currentPath);
	const [searchWord, setSearchWord] = useState(
		// 检验 decodedCurrentPath 是否以 /search/ 开头
		decodedCurrentPath.startsWith("/search/")
			? decodedCurrentPath.slice("/search/".length)
			: ""
	);

	const navigate = useNavigate();

	return (
		<label htmlFor={inputId} className={style["search-box"]}>
			<SVGIcon name='search' />
			<input
				placeholder='搜索'
				value={searchWord}
				onChange={(e) => {
					setSearchWord(e.target.value);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						// 对searchWord进行url编码
						const encodedSearchWord =
							encodeURIComponent(searchWord);
						navigate(`/search/${encodedSearchWord}`);
					}
				}}
				type='text'
				id={inputId}
			/>
		</label>
	);
}
