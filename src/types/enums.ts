/**
 * 交互枚举
 */

export enum InteractionEnum {
	/** 点赞 */
	praise = 2,
	/** 收藏 */
	collection = 3,
	/** 取消点赞 */
	unpraise = 4,
	/** 取消收藏 */
	uncollection = 5,
}

/**
 * 消息类型枚举
 */
export enum MessageTypeEnum {
	/** 全部消息 */
	all = "all",
	/** 系统消息 */
	system = "system",
	/** 评论消息 */
	comment = "comment",
	/** 回复消息 */
	reply = "reply",
	/** 点赞消息 */
	praise = "praise",
	/** 收藏消息 */
	collect = "collect",
	/** 关注消息 */
	follow = "follow",
}
