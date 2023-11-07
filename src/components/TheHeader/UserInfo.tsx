import useLoginStore from "@/stores/useLoginStore";
import Avatar from "../GlobalAvatar";
import style from "./UserInfo.module.scss";
import SVGIcon from "../SVGIcon";
import { MessageTypeEnum } from "@/types/enums";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	NotificationVO,
	getNotifications,
	getNotificationsPage,
} from "@/apis/notification";
import useLoadPerPage from "@/hooks/useLoadPerPage";

function UserInfo() {
	const userInfo = useLoginStore((state) => state.userInfo);
	return (
		<div className={style["user-info"]}>
			<Avatar
				styleConfig={{
					width: "100%",
					height: "100%",
				}}
				avatarSrc={userInfo?.picture}
			/>
			<div className={`${style.dropdown} ${style.item}`}>
				<SVGIcon name='notifications' />
				<UserNotification />
			</div>
		</div>
	);
}

function UserNotification() {
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
		<div className={`${style.main} ${style.notification}`}>
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
			<hr />
			<div>
				{data.map((msg) => (
					<div key={msg.msgId}>{msg.msg}</div>
				))}
			</div>
		</div>
	);
}

export default UserInfo;
