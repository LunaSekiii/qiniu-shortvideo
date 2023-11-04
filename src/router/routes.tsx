import { Navigate, RouteObject } from "react-router-dom";
// import LazyLoad from "./LazyLoad";
import Main from "@/pages/Main";
import Category from "@/pages/Category";
import User from "@/pages/User";

/**
 * 路由配置
 */
const routers: RouteObject[] = [
	{
		path: "/",
		element: <Main />,
		children: [],
	},
	// 分类页面
	{
		path: "/category/:categoryId",
		element: <Category />,
	},
	// 用户页面
	{
		path: "/user/:userId",
		element: <User />,
	},
	{
		path: "*",
		element: <Navigate to='/' />,
	},
];

export default routers;
