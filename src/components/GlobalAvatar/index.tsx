import useLoginStore from "@/stores/useLoginStore";
import style from "./Avatar.module.scss";

type AvatarProps = {
	avatarSrc?: string;
	styleConfig?: React.CSSProperties;
	children?: React.ReactNode;
};
const defaultStyleConfig: React.CSSProperties = {
	width: "40px",
	height: "40px",
};

/**
 * 用户头像组件
 */
function Avatar({
	styleConfig = defaultStyleConfig,
	children,
	avatarSrc = "/account.svg",
}: AvatarProps) {
	const openUserCenter = useLoginStore((state) => state.openUserCenter);
	return (
		<div
			className={style.avatar}
			style={styleConfig}
			onClick={() => {
				openUserCenter();
			}}
		>
			{/* User */}
			<img src={avatarSrc} alt='avatar' />
			{
				// 预留插槽
				children ? children : null
			}
		</div>
	);
}

export default Avatar;
