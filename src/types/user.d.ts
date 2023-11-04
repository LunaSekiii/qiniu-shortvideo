/**
 * 用户类型
 */
declare namespace UserType {
	/**
	 * 用户简要信息
	 */
	interface SimpleUserInfoDTO {
		/** 用户Id */
		userId: number;
		/** 用户头像 */
		picture: string;
		/** 用户名 */
		userName: string;
	}

	/**
	 * 用户基础信息
	 */
	interface BaseUserInfoDTO {
		/** 用户Id */
		userId: number;
		/** 用户头像 */
		picture: string;
		/** 用户名 */
		userName: string;
		/** 用户角色 */
		role: string;
		/** 用户简介 */
		profile: string;
		/** 用户邮箱 */
		email: string;
	}
}
