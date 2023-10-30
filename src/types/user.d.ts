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
}
