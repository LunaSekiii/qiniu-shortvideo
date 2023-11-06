import style from "../VideoInteraction.module.scss";
import SVGIcon, { SVGIconName } from "@/components/SVGIcon";
import { formatNumber } from "@/utils/formatNumber";

/**
 * 视频交互组件子组件
 */
export function VideoInteractionItem({
	name,
	count,
	active,
	onClick,
}: {
	name: SVGIconName;
	count: number;
	active?: boolean;
	onClick?: () => void;
}) {
	return (
		<div className={style["interaction-btn"]} onClick={onClick}>
			<SVGIcon name={name} active={active} />
			<p>{formatNumber(count)}</p>
		</div>
	);
}
