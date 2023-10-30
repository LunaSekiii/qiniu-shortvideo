import React from "react";
import SVGIcon, { SVGIconName } from "../SVGIcon";
import style from "./Navbar.module.scss";

function Navbar() {
	const [activeNav, setActiveNav] = React.useState<string>("home");
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
					{memuList.map((memu, index) => (
						// <>
						<ul key={index}>
							{memu.map((item) => {
								const isActive = item.key === activeNav;
								return (
									<li
										key={item.key}
										data-active={isActive}
										onClick={() => setActiveNav(item.key)}
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

type MemuItem = {
	name: string;
	key: string;
	icon: SVGIconName;
};

const memuList: MemuItem[][] = [
	[
		{
			name: "首页",
			key: "home",
			icon: "home",
		},
		{
			name: "推荐",
			key: "favourite",
			icon: "favourite",
		},
		{
			name: "关注",
			key: "person_add",
			icon: "person_add",
		},
		{
			name: "朋友",
			key: "group",
			icon: "group",
		},
		{
			name: "我的",
			key: "person",
			icon: "person",
		},
	],
	[
		{
			name: "直播",
			key: "live_tv",
			icon: "live_tv",
		},
		{
			name: "放映厅",
			key: "theaters",
			icon: "theaters",
		},
		{
			name: "知识",
			key: "book",
			icon: "book",
		},
		{
			name: "热点",
			key: "fire",
			icon: "fire",
		},
		{
			name: "游戏",
			key: "sports_esports",
			icon: "sports_esports",
		},
		{
			name: "娱乐",
			key: "kid_star",
			icon: "kid_star",
		},
		{
			name: "二次元",
			key: "cruelty_free",
			icon: "cruelty_free",
		},
		{
			name: "音乐",
			key: "library_music",
			icon: "library_music",
		},
		{
			name: "美食",
			key: "dinner_dining",
			icon: "dinner_dining",
		},
		{
			name: "体育",
			key: "sports_basketball",
			icon: "sports_basketball",
		},
		{
			name: "时尚",
			key: "fashion",
			icon: "diamond",
		},
	],
];

export default Navbar;
