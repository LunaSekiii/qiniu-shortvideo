import { getVideoInteraction } from "@/apis/video";
import { VideoContainerContext } from "@/components/VideoContainer";
import { InteractionEnum } from "@/types/enums";
import { useCallback, useContext } from "react";

/**
 * 视频交互Hook(只能在VideoContainer内部组件中使用)
 */
const useInteraction = () => {
	const updateVideo = useContext(VideoContainerContext).updateVideo;

	// 暴露出一个方法，用于在视频交互时调用，根据传入的type，先请求接口，
	// 再更新视频信息，请求失败则不更新视频信息，并直接返回false
	const interaction = useCallback(
		(type: InteractionEnum) => {
			updateVideo((video, updateVideo) => {
				getVideoInteraction({
					operate: type,
					videoId: video.videoId,
				});
				return updateVideo({
					...video,
					praised:
						type === InteractionEnum.praise
							? true
							: type === InteractionEnum.unpraise
							? false
							: video.praised,
					collected:
						type === InteractionEnum.collection
							? true
							: type === InteractionEnum.uncollection
							? false
							: video.collected,

					count: {
						...video.count,
						praiseCount:
							video.count.praiseCount +
							(type === InteractionEnum.praise
								? 1
								: type === InteractionEnum.unpraise
								? -1
								: 0),
						collectionCount:
							video.count.collectionCount +
							(type === InteractionEnum.collection
								? 1
								: type === InteractionEnum.uncollection
								? -1
								: 0),
					},
				});
			});
		},
		[updateVideo]
	);
	return interaction;
};
export default useInteraction;
