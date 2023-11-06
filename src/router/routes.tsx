import { Navigate, RouteObject } from "react-router-dom";
// import LazyLoad from "./LazyLoad";
import Home from "@/pages/Home";
import Category from "@/pages/Category";
import User from "@/pages/User";
import Search from "@/pages/Search";

/**
 * 路由配置
 */
const routers: RouteObject[] = [
	{
		path: "/home",
		element: <Home />,
		children: [],
	},
	{
		path: "/",
		element: <Navigate to='/home' />,
	},
	// 分类页面
	{
		path: "/category/:categoryId",
		element: <Category />,
	},
	// 用户页面
	{
		path: "/user/:userId/*",
		element: <User />,
	},
	// 搜索页面
	{
		path: "/search/*",
		element: <Search />,
	},
	{
		path: "*",
		element: <Navigate to='/' />,
	},
];

export default routers;
