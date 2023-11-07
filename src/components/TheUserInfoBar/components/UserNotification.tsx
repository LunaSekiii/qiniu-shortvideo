import style from "../UserInfo.module.scss";
import { MessageTypeEnum } from "@/types/enums";
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import {
	NotificationVO,
	getNotifications,
	getNotificationsPage,
} from "@/apis/notification";
import useLoadPerPage from "@/hooks/useLoadPerPage";
import { NotificationType } from "@/types/notification";

/**
 * 用户消息组件
 */
export function UserNotification() {
	const [msgType, setMsgType] = useState(MessageTypeEnum.all);
	const [MSGVO, setMSGVO] = useState<NotificationVO>();

	useEffect(() => {
		getNotifications(msgType).then((res) => {
			setMSGVO(res);
		});
	}, [msgType]);

	const loadData = useCallback(
		async (page: number, size: number) => {
			return await getNotificationsPage({
				type: msgType,
				page,
				size,
			});
		},
		[msgType]
	);

	const { getData, data } = useLoadPerPage({
		loadData,
		initialData: MSGVO?.list.list || undefined,
	});

	return (
		<div className={`${style.notification} ${style.main}`}>
			<div className={style.head}>
				<div>消息列表</div>
				<div className={style.select}>
					<select
						value={msgType}
						onChange={(e) => {
							setMsgType(e.target.value as MessageTypeEnum);
						}}
					>
						<option value={MessageTypeEnum.all}>全部</option>
						<option value={MessageTypeEnum.comment}>评论</option>
						<option value={MessageTypeEnum.reply}>回复</option>
						<option value={MessageTypeEnum.praise}>点赞</option>
						<option value={MessageTypeEnum.collect}>收藏</option>
						<option value={MessageTypeEnum.follow}>关注</option>
						<option value={MessageTypeEnum.system}>系统</option>
					</select>
				</div>
			</div>
			<hr />
			<div>
				{data.map((msg, index) => (
					<UserNotificationItem
						key={msg.msgId}
						msg={msg}
						isLast={index === data.length - 1}
						loadMore={getData}
					/>
				))}
			</div>
		</div>
	);
}
type UserNotificationProps = {
	msg: NotificationType.Notification;
	loadMore: () => void;
	isLast?: boolean;
};
/**
 * 消息子组件
 */
function UserNotificationItem(props: UserNotificationProps) {
	const { msg, isLast = false, loadMore } = props;
	const msgRef = useRef<HTMLDivElement>(null);

	// 如果当前消息是最后一条，并且出现在视口中，则加载更多
	useLayoutEffect(() => {
		if (!isLast) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				loadMore();
			}
		});
		if (msgRef.current) {
			observer.observe(msgRef.current);
		}
		return () => {
			observer.disconnect();
		};
	}, [isLast, loadMore]);

	return (
		<div ref={msgRef} className={style.msg}>
			{msg.msg}
			<div className={style.msg3}>
				<div></div>
				<div>{msg.operateUserName}</div>
			</div>
		</div>
	);
}
