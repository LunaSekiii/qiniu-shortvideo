import { getVideoDetail, getVideoListByCategory } from "@/apis/video";
import { VideoList } from "@/components/VideoList";
import useLoadPerPage from "@/hooks/useLoadPerPage";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * 推荐页面
 */
function Video() {
	const loadData = useCallback(
		(page: number, pageSize: number) =>
			getVideoListByCategory({
				categoryId: -1,
				page,
				size: pageSize,
			}),
		[]
	);

	const { vid } = useParams();

	const [shareVideo, setShareVideo] = useState<VideoType.VideoInfo[]>();

	useEffect(() => {
		if (!vid) return;
		getVideoDetail(Number(vid)).then((res) => {
			setShareVideo([res.video]);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [vid]);

	const { data, getData, reset, updateData } =
		useLoadPerPage<VideoType.VideoInfo>({
			loadData,
			pageSize: 30,
			initialData: shareVideo,
			uniqueKey: "videoId",
		});

	if (!data) return <div></div>;

	return (
		<VideoList
			data={data}
			getData={getData}
			resetData={reset}
			updateData={updateData}
		/>
	);
}

export default Video;
