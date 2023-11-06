import HomePageLayout from "@/layouts/HomePageLayout";
import style from "./User.module.scss";
import ParamsChecker from "@/components/ParamsCheck";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useLoginStore from "@/stores/useLoginStore";

import {
	UserHomeType,
	getUserInfo,
	getUserInfoById,
	getUserInfoByIdPerPage,
} from "@/apis/user";
import VideoTile from "@/components/VideoTile";
import useLoadPerPage from "@/hooks/useLoadPerPage";

/**
 * 用户主页
 */
function User() {
	const [activeTab, setActiveTab] = useState("works");
	const LoginUserInfo = useLoginStore((state) => state.userInfo);
	const { userId, "*": tab } = useParams();

	const isSelf = useMemo(() => {
		if (userId === "self") return true;
		return Number(userId) === LoginUserInfo?.userId;
	}, [userId, LoginUserInfo]);

	const [userHomeInfo, updateUserHomeInfo] = useState<UserHomeType>();

	// 用户信息处理
	useEffect(() => {
		if (userId === "self") {
			// 登录鉴权
			// auth(async () => {
			if (!LoginUserInfo?.userId) {
				getUserInfo().then((res) => {
					console.log("asd");
					getUserInfoById(res.userId).then((res) => {
						updateUserHomeInfo(res);
					});
				});
			}
			getUserInfoById(LoginUserInfo?.userId as number).then((res) => {
				updateUserHomeInfo(res);
			});
			// });
		} else {
			getUserInfoById(Number(userId)).then((res) => {
				updateUserHomeInfo(res);
			});
		}
	}, [userId]);

	// 初始化 activeTab
	useEffect(() => {
		//如果tab和 userInfoTabMap 中的 tab 一致，则设置 activeTab
		const index = userInfoTabMap.findIndex((item) => item.tab === tab);
		if (index !== -1) {
			// 不是自己主页，只有 works 和 like
			if (!isSelf && index > 1) return;
			setActiveTab(userInfoTabMap[index].tab);
		} else {
			// 默认设置为 works
			setActiveTab("works");
		}
		// 仅作初始化，不需要依赖
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// 路由处理
	useEffect(() => {
		// 这里会导致页面初次加载时，会有两次 history.pushState，影响不大
		const path = isSelf
			? `/user/self/${activeTab}`
			: `/user/${userId}/${activeTab}`;
		window.history.replaceState({}, "", path);
	}, [activeTab, isSelf, tab, userId]);

	const loadData = useCallback(
		async (page: number, pageSize: number) => {
			const homeData = await getUserInfoByIdPerPage(
				userId === "self"
					? (LoginUserInfo?.userId as number)
					: Number(userId),
				page,
				pageSize,
				activeTab
			);
			return homeData.homeSelectList;
		},
		[LoginUserInfo?.userId, activeTab, userId]
	);

	const { data, getData, reset } = useLoadPerPage({
		loadData,
		initialData: userHomeInfo?.homeSelectList.list,
	});

	console.log(userHomeInfo);

	return (
		<HomePageLayout>
			<div className={style["user-page"]}>
				<div className={style.head}>
					<h1>{userHomeInfo?.userHome.userName}</h1>
					<UserInfoTab
						activeTab={activeTab}
						setAvtiveTab={setActiveTab}
						isSelf={isSelf}
					/>
				</div>
				<VideoTile data={data} getData={getData} resetData={reset} />
			</div>
		</HomePageLayout>
	);
}

const userInfoTabMap = [
	{
		name: "作品",
		tab: "works",
	},
	{
		name: "喜欢",
		tab: "like",
	},
	{
		name: "收藏",
		tab: "collection",
	},
	{
		name: "历史",
		tab: "history",
	},
];

function UserInfoTab(props: {
	activeTab: string;
	setAvtiveTab: (index: string) => void;
	isSelf: boolean;
}) {
	const { activeTab, setAvtiveTab, isSelf } = props;
	return (
		<div className={style.tabs}>
			{(isSelf ? userInfoTabMap : userInfoTabMap.slice(0, 2)).map(
				(tab) => (
					<div
						className={style.tab}
						data-active={tab.tab === activeTab}
						key={tab.tab}
						onClick={() => setAvtiveTab(tab.tab)}
					>
						{tab.name}
					</div>
				)
			)}
		</div>
	);
}

const ParamsCheckedUser = () => (
	<ParamsChecker
		checkOption={({ userId }) =>
			!isNaN(Number(userId)) || userId === "self"
		}
		redirect='/'
	>
		<User />
	</ParamsChecker>
);

export default ParamsCheckedUser;
