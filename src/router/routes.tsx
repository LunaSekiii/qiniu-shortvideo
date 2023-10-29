import { RouteObject } from "react-router-dom";
// import LazyLoad from "./LazyLoad";
import Main from "@/pages/Main";

/**
 * 路由配置
 */
const routers: RouteObject[] = [
	{
		path: "/",
		element: <Main />,
	},
];

export default routers;
