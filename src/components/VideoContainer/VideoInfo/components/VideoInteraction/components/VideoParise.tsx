import { useMemo, useState } from "react";
import { VideoInteractionItem } from "./VideoInteractionItem";
import useInteraction from "../useInteraction";
import { InteractionEnum } from "@/types/enums";
import useEventCallback from "@/hooks/useEventCallback";
import throttle from "@/utils/throttle";

/**
 * 视频点赞组件
 */
export function VideoParise({
	parised,
	pariseCount,
}: {
	parised: boolean;
	pariseCount: number;
}) {
	const [count, setCount] = useState(pariseCount);
	const [isParised, setIsParised] = useState(parised);
	const interaction = useInteraction();
	const onClickImpl = useEventCallback(() => {
		if (isParised) interaction(InteractionEnum.unpraise);
		else interaction(InteractionEnum.praise);
		setIsParised(!isParised);
		setCount((count) => count + (isParised ? -1 : 1));
	});
	const onClick = useMemo(() => throttle(onClickImpl, 1000), [onClickImpl]);
	return (
		<VideoInteractionItem
			name='favourite'
			count={count}
			active={isParised}
			onClick={onClick}
		/>
	);
}
