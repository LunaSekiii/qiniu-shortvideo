import { getVideoInteraction } from "@/apis/video";
import { VideoContainerContext } from "@/components/VideoContainer";
import { VideoInteractionEnum } from "@/types/enums";
import { useCallback, useContext } from "react";

/**
 * 视频交互Hook(只能在VideoContainer内部组件中使用)
 */
const useInteraction = () => {
	const updateVideo = useContext(VideoContainerContext).updateVideo;

	// 暴露出一个方法，用于在视频交互时调用，根据传入的type，先请求接口，
	// 再更新视频信息，请求失败则不更新视频信息，并直接返回false
	const interaction = useCallback(
		(type: VideoInteractionEnum) => {
			updateVideo((video, updateVideo) => {
				getVideoInteraction({
					operate: type,
					videoId: video.videoId,
				});
				console.log(type);
				return updateVideo({
					...video,
					parised:
						type === VideoInteractionEnum.praise
							? true
							: type === VideoInteractionEnum.unpraise
							? false
							: video.parised,
					collected:
						type === VideoInteractionEnum.collection
							? true
							: type === VideoInteractionEnum.uncollection
							? false
							: video.collected,

					count: {
						...video.count,
						praiseCount:
							video.count.praiseCount +
							(type === VideoInteractionEnum.praise
								? 1
								: type === VideoInteractionEnum.unpraise
								? -1
								: 0),
						collectionCount:
							video.count.collectionCount +
							(type === VideoInteractionEnum.collection
								? 1
								: type === VideoInteractionEnum.uncollection
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
