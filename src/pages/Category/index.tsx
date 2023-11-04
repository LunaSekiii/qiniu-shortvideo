import { getVideoListByCategory } from "@/apis/video";
import { VideoList } from "@/components/VideoList";
import HomePageLayout from "@/layouts/HomePageLayout";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import useLoadPerPage from "./useLoadPerPage";
import ParamsChecker from "@/components/ParamsCheck";

/**
 * 分类视频
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

	const { data, getData, reset } = useLoadPerPage<Video.VideoInfo>({
		loadData,
	});

	if (!data) return <div></div>;

	return (
		<HomePageLayout>
			<VideoList data={data} getData={getData} resetData={reset} />
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
