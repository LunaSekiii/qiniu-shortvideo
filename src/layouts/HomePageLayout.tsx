import React from "react";
import style from "./HomePageLayout.module.scss";
import Navbar from "@/components/TheNavbar";
import TheHeader from "@/components/TheHeader";

/**
 * 主页基础布局
 */
function HomePageLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className={style["home-page"]}>
			<Navbar />
			<div className={style.main}>
				<TheHeader />
				<div className={style.container}>{children}</div>
			</div>
		</div>
	);
}

export default HomePageLayout;
