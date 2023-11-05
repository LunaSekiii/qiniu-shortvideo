import { getUserInfo, getUserLogout, postUserLogin } from "@/apis/user";
import { create } from "zustand";

type UserLoginStore = {
	/** 当前登录用户信息 */
	userInfo: UserType.BaseUserInfoDTO | null;
	/** 登录框是否可见 */
	loginBoxVisible: boolean;
	/** 正在请求 */
	loading: boolean;
	/** 获取当前用户信息 */
	getUserInfo: () => Promise<UserType.BaseUserInfoDTO | null | "loading">;
	/** 登录 */
	login: (params: RequestType.loginParams) => Promise<void>;
	/** 登出 */
	logout: () => Promise<void>;
	/** 显示登录框 */
	showLoginBox: () => void;
	/** 关闭登录框 */
	closeLoginBox: () => void;
	/** 打开用户中心 */
	openUserCenter: () => void;
};

const useLoginStore = create<UserLoginStore>((set, get) => ({
	userInfo: null,
	loginBoxVisible: false,
	loading: false,
	getUserInfo: async () => {
		if (get().loading) return "loading";
		set({ loading: true });
		if (get().userInfo !== null) return get().userInfo;
		try {
			const res = await getUserInfo();
			set({ userInfo: res });
			return res;
		} catch (e) {
			console.error("获取用户信息失败: " + e);
			return null;
		} finally {
			set({ loading: false });
		}
	},
	login: async (params) => {
		try {
			const res = await postUserLogin(params);
			set({ userInfo: res });
		} catch (e) {
			return;
		}
		// location.reload();
	},
	logout: async () => {
		try {
			await getUserLogout();
			set({ userInfo: null });
		} catch (e) {
			return;
		}
		// location.reload();
	},
	showLoginBox: () => {
		set({ loginBoxVisible: true });
	},
	closeLoginBox: () => {
		set({ loginBoxVisible: false });
	},
	openUserCenter: () => {
		if (get().userInfo) location.href = "/user/self";
		else get().showLoginBox();
	},
}));

export default useLoginStore;
