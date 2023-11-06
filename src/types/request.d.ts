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

	/**
	 * 视频搜索参数
	 */
	interface getVideoListByKeywordParams {
		/** 关键词 */
		keyword: string;
		/** 页数 */
		page: number;
		/** 页面大小 */
		size?: number;
	}

	/**
	 * 视频交互参数
	 */
	interface getVideoInteractionParams {
		/** 视频Id */
		videoId: Video.VideoId;
		/** 交互类型 */
		operate: VideoInteractionEnum;
	}

	/**
	 * 获取视频评论列表参数
	 */
	interface getVideoCommentListParams {
		/** 视频Id */
		videoId: Video.VideoId;
		/** 页数 */
		page: number;
		/** 页面大小 */
		size?: number;
	}

	/**
	 * 评论参数
	 */
	interface postVideoCommentParams {
		/** 视频Id */
		videoId: Video.VideoId;
		/** 评论内容 */
		commentContent: string;
		/** 父评论Id */
		parentCommentId?: Comment.CommentId;
		/** 顶级评论Id */
		topCommentId?: Comment.CommentId;
	}

	/**
	 * 评论交互参数
	 */
	interface getVideoCommentInteractionParams {
		/** 评论Id */
		commentId: Comment.CommentId;
		/** 交互类型 */
		interactionType: InteractionEnum;
	}
}
