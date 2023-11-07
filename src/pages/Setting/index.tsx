import { useCallback, useEffect, useState } from "react";
import style from "./Setting.module.scss";
import useLoginStore from "@/stores/useLoginStore";
import { postUserInfo } from "@/apis/user";
import { toast } from "react-toastify";
import { InfoInput } from "./components/InfoInput";
import { AvatarSetting } from "./components/AvatarSetting";

/**
 * 设置页
 */
function Setting() {
	const userInfo = useLoginStore((state) => state.userInfo);
	const updateUserInfo = useLoginStore((state) => state.updateUserInfo);

	const [curAvatar, setCurAvatar] = useState<string>("");
	const [userName, setUserName] = useState<string>("");
	const [userEmail, setUserEmail] = useState<string>("");
	const [userProfile, setUserProfile] = useState<string>("");

	useEffect(() => {
		if (userInfo) {
			setCurAvatar(userInfo.picture);
			setUserName(userInfo.userName);
			setUserEmail(userInfo.email);
			setUserProfile(userInfo.profile);
		}
	}, [userInfo]);

	const onSubmit = useCallback(
		(e?: React.FormEvent<HTMLFormElement>) => {
			e?.preventDefault();
			const toastId = toast.loading("正在修改", {
				toastId: "upload-userInfo",
			});
			postUserInfo({
				userName,
				email: userEmail,
				profile: userProfile,
				picture: curAvatar,
			})
				.then((res) => {
					if (res) {
						toast.update(toastId, {
							render: "修改成功",
							type: "success",
							autoClose: 2000,
							isLoading: false,
						});
						updateUserInfo();
					} else {
						toast.update(toastId, {
							render: "修改失败",
							type: "error",
							autoClose: 2000,
							isLoading: false,
						});
					}
				})
				.catch(() => {
					toast.update(toastId, {
						render: "修改失败",
						type: "error",
						autoClose: 2000,
						isLoading: false,
					});
				});
		},
		[curAvatar, updateUserInfo, userEmail, userName, userProfile]
	);

	if (!userInfo) return <div>请先登录</div>;

	return (
		<div className={style.setting}>
			<h1>用户设置</h1>
			<hr />
			<form onSubmit={onSubmit}>
				<div className={style.info}>
					<div className={style.info1}>
						{/* 基础信息 */}
						<InfoInput
							label='昵称'
							data={userName}
							setData={setUserName}
						/>
						<InfoInput
							label='邮箱'
							data={userEmail}
							setData={setUserEmail}
						/>
						<InfoInput
							label='个人简介'
							data={userProfile}
							setData={setUserProfile}
						/>
						<div
							className={style.submit}
							data-active={true}
							onClick={() => onSubmit()}
						>
							保存个人信息
						</div>
					</div>
					<div className={style.info2}>
						{/* 头像等 */}
						<AvatarSetting
							curAvatar={curAvatar}
							setCurAvatar={setCurAvatar}
						/>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Setting;
