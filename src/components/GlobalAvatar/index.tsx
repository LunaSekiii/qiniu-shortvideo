import style from "./Avatar.module.scss";

type AvatarProps = {
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
function Avatar({ styleConfig = defaultStyleConfig, children }: AvatarProps) {
	return (
		<div className={style.avatar} style={styleConfig}>
			User
			{
				// 预留插槽
				children ? children : null
			}
		</div>
	);
}

export default Avatar;
