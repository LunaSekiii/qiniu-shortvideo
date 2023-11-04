import fetchService from "./fetchServer";

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
		// urlencoded,
		// {
		// 	headers: { "Content-Type": "x-www-form-urlencoded;charset=UTF-8" },
		// }
	);
}

/**
 * 获取当前用户信息
 */
export function getUserInfo() {
	return fetchService.get<UserType.BaseUserInfoDTO>("/api/us/info");
}
