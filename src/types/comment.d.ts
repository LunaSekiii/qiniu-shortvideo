/**
 * 评论类型
 */
declare namespace CommentType {
	/**
	 * 顶级评论
	 */
	interface TopComment extends BaseComment {
		/** 评论回复数 */
		commentCount: number;
		/** 评论回复列表 */
		childComments: SubComment[];
	}

	/**
	 * 子评论
	 */
	interface SubComment extends BaseComment {
		/** 父评论内容 */
		parentContent: string;
	}
}

/**
 * 基础评论信息
 */
interface BaseComment {
	/** 用户Id */
	userId: number;
	/** 用户名 */
	userName: string;
	/** 用户头像 */
	userPhoto: string;
	/** 评论内容 */
	commentContent: string;
	/** 评论时间 */
	commentTime: string;
	/** 评论Id */
	commentId: number;
	/** 评论点赞数 */
	praiseCount: number;
	/** 是否点赞 */
	praised: boolean;
}
