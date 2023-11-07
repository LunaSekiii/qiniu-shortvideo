import HomePageLayout from "@/layouts/HomePageLayout";
import { Outlet } from "react-router-dom";

/**
 * 主页页面共用布局
 */
function Main() {
	return (
		<HomePageLayout>
			<Outlet />
		</HomePageLayout>
	);
}

export default Main;
