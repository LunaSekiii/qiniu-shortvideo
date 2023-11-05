import useLoginStore from "@/stores/useLoginStore";

/**
 * 需要登录才能访问的页面，调用此函数
 * @param fn 需要登录才能访问的页面的函数
 */
async function auth(fn: () => void) {
	const userInfo = await useLoginStore.getState().getUserInfo();
	const userInfo2 = useLoginStore.getState().userInfo;
	console.log("鉴权", userInfo, userInfo2);
	if (!userInfo2) {
		// 重试
		setTimeout(() => auth(fn), 1000);
		return console.log("正在请求用户信息");
	}
	// 如果已经登录，直接执行
	else if (userInfo2) fn();
	// 否则显示登录框
	else useLoginStore.getState().showLoginBox();
}

export default auth;
