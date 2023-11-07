import { MessageTypeEnum } from "@/types/enums";
import fetchService from "./fetchServer";
import { NotificationType } from "@/types/notification";

/**
 * 消息分页列表
 */
export type NotificationList = List<NotificationType.Notification>;

/**
 * 首页消息列表
 */
export type NotificationVO = {
	list: NotificationList;
	unreadCountMap: Record<MessageTypeEnum, number>;
};

/**
 * 获取消息首页列表接口
 */
export function getNotifications(type: MessageTypeEnum) {
	return fetchService.get<NotificationVO>(`/notice/${type}`);
}

/**
 * 获取消息分页列表接口
 */
export function getNotificationsPage({
	type,
	page,
	size,
}: RequestType.getNotificationsPageParams) {
	return fetchService.get<NotificationList>(
		`/notice/page/${type}?page=${page}&pageSize=${size}`
	);
}
