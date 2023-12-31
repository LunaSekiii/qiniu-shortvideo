import { Navigate, RouteObject } from "react-router-dom";
// import LazyLoad from "./LazyLoad";
import Home from "@/pages/Home";
import Category from "@/pages/Category";
import User from "@/pages/User";
import Search from "@/pages/Search";
import Setting from "@/pages/Setting";
import Main from "@/pages/Main";
import Upload from "@/pages/Upload";
import Recommend from "@/pages/Recommend";
import Video from "@/pages/Video";

/**
 * 路由配置
 */
const routers: RouteObject[] = [
	{
		path: "/",
		element: <Main />,
		children: [
			// 首页
			{
				path: "/home",
				element: <Home />,
				children: [],
			},
			{
				path: "/",
				element: <Navigate to='/home' />,
			},
			// 推荐页面
			{
				path: "/recommend",
				element: <Recommend />,
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
			// 视频详情页面
			{
				path: "/video/:vid",
				element: <Video />,
			},
		],
	},

	{
		path: "*",
		element: <Navigate to='/' />,
	},
];

export default routers;
