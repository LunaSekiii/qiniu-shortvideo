import { Navigate, RouteObject } from "react-router-dom";
// import LazyLoad from "./LazyLoad";
import Home from "@/pages/Home";
import Category from "@/pages/Category";
import User from "@/pages/User";
import Search from "@/pages/Search";
import Setting from "@/pages/Setting";
import Main from "@/pages/Main";
import Upload from "@/pages/Upload";

/**
 * 路由配置
 */
const routers: RouteObject[] = [
	{
		path: "/",
		element: <Main />,
		children: [
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
			// 设置页面
			{
				path: "/setting",
				element: <Setting />,
			},
			// 上传页面
			{
				path: "/upload",
				element: <Upload />,
			},
		],
	},

	{
		path: "*",
		element: <Navigate to='/' />,
	},
];

export default routers;
