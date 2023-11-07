import { MessageTypeEnum } from "./enums";

declare namespace NotificationType {
	/**
	 * 通知消息
	 */
	interface Notification {
		/** 消息Id */
		msgId: number;
		/** 关联主体Id */
		relatedId: number;
		/** 关联信息 */
		relatedInfo: string;
		/** 操作用户Id */
		operateUserId: number;
		/** 操作用户名称 */
		operateUserName: string;
		/** 操作用户头像 */
		operateUserPhoto: string;
		/** 操作类型 */
		type: MessageTypeEnum;
		/** 消息正文 */
		msg: string;
		/** 消息状态(0未读， 1已读) */
		state: number;
		/** 创建时间 */
		createTime: string;
	}
}
