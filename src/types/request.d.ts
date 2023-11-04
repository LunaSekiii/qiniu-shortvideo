/**
 * 请求类型
 */
declare namespace RequestType {
	/**
	 * 获取视频流列表参数
	 */
	interface getVideoListByCategoryParams {
		/** 分类Id */
		categoryId: Category.CategoryId;
		/** 页数 */
		page: number;
		/** 页面大小 */
		size?: number;
	}
	/**
	 * 登录参数
	 */
	interface loginParams {
		/** 用户名 */
		username: string;
		/** 密码 */
		password: string;
	}
}
