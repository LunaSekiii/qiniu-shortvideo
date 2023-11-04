import { getUserInfo, postUserLogin } from "@/apis/user";
import { create } from "zustand";

type UserLoginStore = {
	/** 当前登录用户信息 */
	userInfo: UserType.BaseUserInfoDTO | null;
	/** 登录框是否可见 */
	loginBoxVisible: boolean;
	/** 获取当前用户信息 */
	getUserInfo: () => void;
	/** 登录 */
	login: (params: RequestType.loginParams) => Promise<void>;
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
	getUserInfo: async () => {
		try {
			const res = await getUserInfo();
			set({ userInfo: res });
		} catch (e) {
			return console.log(e);
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
