import React, { useEffect } from "react";
import SVGIcon from "../SVGIcon";
import style from "./Navbar.module.scss";
import memuList from "./navbarList";
import { useNavigate } from "react-router-dom";

function Navbar() {
	const [activeNav, setActiveNav] = React.useState<string | number>("home");
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/category/" + activeNav);
	}, [activeNav]);

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
										onClick={() => {
											setActiveNav(item.key);
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
