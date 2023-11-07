import { useContext, useMemo, useState } from "react";
import { VideoInteractionItem } from "./VideoInteractionItem";
import useEventCallback from "@/hooks/useEventCallback";
import useInteraction from "../useInteraction";
import { InteractionEnum } from "@/types/enums";
import throttle from "@/utils/throttle";
import { VideoContainerContext } from "@/components/VideoContainer";
import { postVideoInteraction } from "@/apis/video";

/**
 * 视频收藏组件
 */
export function VideoCollection({
	collected,
	collectionCount,
}: {
	collected: boolean;
	collectionCount: number;
}) {
	const [count, setCount] = useState(collectionCount);
	const [isCollected, setIsCollected] = useState(collected);
	const { videoId } = useContext(VideoContainerContext);

	const interaction = useInteraction();

	const onClickImpl = useEventCallback(() => {
		if (isCollected) interaction(InteractionEnum.uncollection);
		else interaction(InteractionEnum.collection);
		postVideoInteraction({
			videoId,
			type: 6,
			data: isCollected ? 0 : 1,
		});
		setIsCollected(!isCollected);
		setCount(count + (isCollected ? -1 : 1));
	});

	const onClick = useMemo(() => throttle(onClickImpl, 5000), [onClickImpl]);

	return (
		<VideoInteractionItem
			name='star'
			count={count}
			active={isCollected}
			onClick={onClick}
		/>
	);
}
