import { getVideoListByCategory } from "@/apis/video";
import HomePageLayout from "@/layouts/HomePageLayout";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import useLoadPerPage from "../../hooks/useLoadPerPage";
import ParamsChecker from "@/components/ParamsCheck";
import VideoTile from "@/components/VideoTile";

/**
 * 分类视频页面
 */
function Category() {
	const { categoryId } = useParams();

	const loadData = useCallback(
		(page: number, pageSize: number) =>
			getVideoListByCategory({
				categoryId: Number(categoryId),
				page,
				size: pageSize,
			}),
		[categoryId]
	);

	const { data, getData, reset } = useLoadPerPage<VideoType.VideoInfo>({
		loadData,
	});

	if (!data) return <div></div>;

	return (
		<HomePageLayout>
			<VideoTile data={data} getData={getData} resetData={reset} />
		</HomePageLayout>
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
