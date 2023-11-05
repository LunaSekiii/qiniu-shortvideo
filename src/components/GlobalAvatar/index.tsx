import useLoginStore from "@/stores/useLoginStore";
import style from "./Avatar.module.scss";
import { useNavigate } from "react-router-dom";

type AvatarProps = {
	avatarSrc?: string;
	styleConfig?: React.CSSProperties;
	children?: React.ReactNode;
	userId?: number;
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
	userId,
}: AvatarProps) {
	const openUserCenter = useLoginStore((state) => state.openUserCenter);
	const navigate = useNavigate();
	return (
		<div
			className={style.avatar}
			style={styleConfig}
			onClick={() => {
				if (!userId) openUserCenter();
				else navigate(`/user/${userId}`);
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
