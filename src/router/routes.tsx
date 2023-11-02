import { Navigate, RouteObject } from "react-router-dom";
// import LazyLoad from "./LazyLoad";
import Main from "@/pages/Main";
import Category from "@/pages/Category";

/**
 * 路由配置
 */
const routers: RouteObject[] = [
	{
		path: "/",
		element: <Main />,
		children: [],
	},
	{
		path: "/category/:categoryId",
		element: <Category />,
	},
	{
		path: "*",
		element: <Navigate to='/' />,
	},
];

export default routers;
