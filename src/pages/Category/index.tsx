import { getVideoListByCategory } from "@/apis/video";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import useLoadPerPage from "../../hooks/useLoadPerPage";
import ParamsChecker from "@/components/ParamsCheck";
import VideoTile from "@/components/VideoTile";
// import useShareVideo from "@/hooks/useShareVideo";

/**
 * 分类视频页面
 */
function Category() {
	const { categoryId } = useParams();

	// const shareVideo = useShareVideo();

	const loadData = useCallback(
		(page: number, pageSize: number) =>
			getVideoListByCategory({
				categoryId: Number(categoryId),
				page,
				size: pageSize,
			}),
		[categoryId]
	);

	const { data, getData, reset, updateData } =
		useLoadPerPage<VideoType.VideoInfo>({
			loadData,
			// initialData: shareVideo,
			// uniqueKey: "videoId",
		});

	if (!data) return <div></div>;

	return (
		<VideoTile
			data={data}
			getData={getData}
			resetData={reset}
			updateData={updateData}
			// isShare={!shareVideo}
		/>
	);
}

/**
 * 分类视频(参数校验)
 */
const ParamsCheckedCategory = () => (
	<ParamsChecker
		checkOption={({ categoryId }) => !isNaN(Number(categoryId))}
		redirect='/category/1'
	>
		<Category />
	</ParamsChecker>
);

export default ParamsCheckedCategory;
