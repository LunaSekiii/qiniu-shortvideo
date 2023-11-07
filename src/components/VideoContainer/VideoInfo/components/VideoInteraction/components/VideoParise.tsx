import { useEffect, useMemo, useState } from "react";
import { VideoInteractionItem } from "./VideoInteractionItem";
import useInteraction from "../useInteraction";
import { InteractionEnum } from "@/types/enums";
import useEventCallback from "@/hooks/useEventCallback";
import throttle from "@/utils/throttle";

/**
 * 视频点赞组件
 */
export function VideoParise({
	praised,
	pariseCount,
}: {
	praised: boolean;
	pariseCount: number;
}) {
	const [count, setCount] = useState(pariseCount);
	const [isPraised, setIsPraised] = useState(praised);

	useEffect(() => {
		console.log(isPraised);
		setCount(pariseCount);
		setIsPraised(praised);
	}, [praised, pariseCount, isPraised]);

	const interaction = useInteraction();
	const onClickImpl = useEventCallback(() => {
		if (isPraised) interaction(InteractionEnum.unpraise);
		else interaction(InteractionEnum.praise);
		setIsPraised(!isPraised);
		setCount((count) => count + (isPraised ? -1 : 1));
	});
	const onClick = useMemo(() => throttle(onClickImpl, 1000), [onClickImpl]);
	return (
		<VideoInteractionItem
			name='favourite'
			count={count}
			active={isPraised}
			onClick={onClick}
		/>
	);
}
