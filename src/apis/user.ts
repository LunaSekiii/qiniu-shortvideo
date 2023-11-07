import fetchService from "./fetchServer";
import { VideoListType } from "./video";

/**
 * 用户登录
 */
export function postUserLogin(params: RequestType.loginParams) {
	const urlencoded = new URLSearchParams();
	urlencoded.append("username", params.username);
	urlencoded.append("password", params.password);
	return fetchService.post<UserType.BaseUserInfoDTO>(
		"/api/us/login" + "?" + urlencoded,
		null
	);
}

/**
 * 用户登出
 */
export function getUserLogout() {
	return fetchService.get<string>("/api/us/logout");
}

/**
 * 获取当前用户信息
 */
export function getUserInfo() {
	return fetchService.get<UserType.BaseUserInfoDTO>("/api/us/user/info");
}

export type UserHomeType = {
	/** 选中的类型 */
	homeSelectType: string;
	/** 选中的类型列表 */
	homeSelectList: VideoListType;
	/** 用户信息 */
	userHome: UserType.UserStatisticsInfoDTO;
	/** 用户关注列表 */
	// followList: UserType.BaseUserInfoDTO[];
};

/**
 * 获取指定用户主页信息
 */
export function getUserInfoById(id: number) {
	return fetchService.get<UserHomeType>("/api/us/user/" + id);
}

/**
 * 获取指定用户主页分页视频信息
 */
export function getUserInfoByIdPerPage(
	id: number,
	page: number,
	size: number,
	homeSelectType: string
) {
	return fetchService.get<UserHomeType>(
		"/api/us/user/page?userId=" +
			id +
			"&page=" +
			page +
			"&pageSize=" +
			size +
			"&homeSelectType=" +
			homeSelectType
	);
}

/**
 * 更新用户信息
 */
export function postUserInfo(params: RequestType.putUserInfoParams) {
	return fetchService.post<boolean>(
		"/api/us/user/saveInfo",
		JSON.stringify(params)
	);
}
