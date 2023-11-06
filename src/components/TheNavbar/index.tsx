import React, { useEffect } from "react";
import SVGIcon from "../SVGIcon";
import style from "./Navbar.module.scss";
import memuList, { MenuType } from "./navbarList";
import { useNavigate } from "react-router-dom";

function Navbar() {
	const [activeNav, setActiveNav] = React.useState<string>("");
	const navigate = useNavigate();

	useEffect(() => {
		// 通过 window.location.pathname 获取当前路径
		const path = window.location.pathname;
		setActiveNav(path);
	}, []);

	return (
		<div className={style.navbar}>
			{/* <title>Fleeting Flow</title> */}
			<title>
				<img
					src='/Fleeting Flow.svg'
					alt='Fleeting Flow'
					draggable={false}
				/>
			</title>
			<div className={style.main}>
				<menu>
					{Object.keys(memuList).map((menu, index) => (
						<ul key={index}>
							{memuList[menu as MenuType].map((item) => {
								const nav = `${menu !== "" ? "/" : ""}${menu}/${
									item.key
								}`;
								// 当nav和当前路径前面匹配时，设置为激活状态

								const isActive =
									menu === ""
										? activeNav.startsWith(nav)
										: nav === activeNav;
								// const isActive = nav === activeNav;
								return (
									<li
										key={item.key}
										data-active={isActive}
										onClick={() => {
											setActiveNav(nav);
											navigate(nav);
										}}
									>
										<SVGIcon
											name={item.icon}
											active={isActive}
										/>
										<span>{item.name}</span>
									</li>
								);
							})}
							<hr />
						</ul>
					))}
				</menu>
			</div>
		</div>
	);
}

export default Navbar;
