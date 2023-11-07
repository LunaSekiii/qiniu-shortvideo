import { useRef } from "react";
import style from "../Setting.module.scss";
import { postUploadImg } from "@/apis/upload";

/**
 * 头像上传组件
 */
export function AvatarSetting({
	curAvatar,
	setCurAvatar,
}: {
	curAvatar?: string;
	setCurAvatar: (avatar: string) => void;
}) {
	const inputRef = useRef<HTMLInputElement>(null);
	// 上传图片，返回图片地址
	const uploadAvatar = (img: File) => {
		return postUploadImg(img);
	};
	// 图片选择后上传
	const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			uploadAvatar(file).then((res) => {
				setCurAvatar("http://" + res);
			});
		}
	};
	return (
		<div>
			<div className={style.avatar}>
				{/* 头像 */}
				<img
					src={curAvatar}
					alt='avatar'
					hidden={!curAvatar}
					draggable={false}
				/>
				{/* 一个绝对定位的遮罩 */}
				<div
					className={style.mask}
					onClick={() => {
						inputRef.current?.click();
					}}
				>
					<div>修改</div>
				</div>
			</div>
			<input
				type='file'
				ref={inputRef}
				accept='image/png, image/jpeg, image/gif, image/jpg'
				multiple={false}
				hidden
				onChange={onAvatarChange}
			/>
		</div>
	);
}
