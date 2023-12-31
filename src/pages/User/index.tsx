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
	postUserFollow,
} from "@/apis/user";
import VideoTile from "@/components/VideoTile";
import useLoadPerPage from "@/hooks/useLoadPerPage";
import { UserInfoTab } from "./userInfoTab";
import { userInfoTabMap } from "./userInfoTabMap";
import Avatar from "@/components/GlobalAvatar";
import { toast } from "react-toastify";

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
	}, [LoginUserInfo?.userId, userId]);

	// 初始化 activeTab
	useEffect(() => {
		//如果tab和 userInfoTabMap 中的 tab 一致，则设置 activeTab
		const index = userInfoTabMap.findIndex((item) => item.tab === tab);
		if (index !== -1) {
			// 不是自己主页，只有 works 和 like
			if (!isSelf && index > 1) return;
			setActiveTab(userInfoTabMap[index].tab);
		} else {
			// 默认设置为 video
			setActiveTab("video");
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

	const { data, getData, reset, updateData } = useLoadPerPage({
		loadData,
		initialData: userHomeInfo?.homeSelectList.list,
	});

	console.log(userHomeInfo);

	const [isFollowed, setIsFollowed] = useState(false);

	useEffect(() => {
		setIsFollowed(userHomeInfo?.userHome.followed || false);
	}, [userHomeInfo?.userHome.followed]);

	return (
		<div className={style["user-page"]}>
			<div className={style.head}>
				<div className={style.user}>
					<div className={style.info}>
						<Avatar
							avatarSrc={userHomeInfo?.userHome.picture}
							userId={userHomeInfo?.userHome.userId}
							styleConfig={{
								width: "100px",
								height: "100px",
							}}
						/>
						<h1>{userHomeInfo?.userHome.userName}</h1>
					</div>
					<div className={style.interaction} hidden={isSelf}>
						<div
							className={style.btn}
							data-active={isFollowed}
							onClick={async () => {
								try {
									await postUserFollow({
										userId: userHomeInfo?.userHome
											.userId as number,
										followed: !isFollowed,
									});
									toast.success(
										isFollowed
											? "取消关注成功"
											: "关注成功",
										{
											toastId: "follow",
										}
									);
									setIsFollowed(!isFollowed);
								} catch (e) {
									toast.error(
										isFollowed
											? "取消关注失败"
											: "关注失败",
										{
											toastId: "follow",
										}
									);
								}
							}}
						>
							{isFollowed ? "已关注" : "关注"}
						</div>
					</div>
				</div>
				<UserInfoTab
					activeTab={activeTab}
					setAvtiveTab={setActiveTab}
					isSelf={isSelf}
				/>
			</div>
			<VideoTile
				data={data}
				getData={getData}
				resetData={reset}
				updateData={updateData}
			/>
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
