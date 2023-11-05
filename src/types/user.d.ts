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
	interface BaseUserInfoDTO extends SimpleUserInfoDTO {
		/** 用户角色 */
		role: string;
		/** 用户简介 */
		profile: string;
		/** 用户邮箱 */
		email: string;
	}

	/**
	 * 用户个人信息
	 */
	export interface UserStatisticsInfoDTO extends BaseUserInfoDTO {
		/** 用户粉丝数 */
		fansCount: number;
		/** 用户关注数 */
		followCount: number;
		/** 用户发布视频数 */
		videoCount: number;
		/** 用户点赞数 */
		praiseCount: number;
		/** 用户收藏数 */
		collectionCount: number;
		/** 视频播放总数 */
		totalReadCount: number;
		/** 是否关注（基于当前登录用户） */
		followed: boolean;
	}
}
