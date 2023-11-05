import { getVideoListByKeyword } from "@/apis/video";
import ParamsChecker from "@/components/ParamsCheck";
import VideoTile from "@/components/VideoTile";
import useLoadPerPage from "@/hooks/useLoadPerPage";
import HomePageLayout from "@/layouts/HomePageLayout";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

/**
 * 搜索页面
 */
function Search() {
	const { "*": search } = useParams();

	const loadData = useCallback(
		(page: number, pageSize: number) =>
			getVideoListByKeyword({
				// 因为进行了校验，所以这里可以断言search一定不为undefined
				keyword: search as string,
				page,
				size: pageSize,
			}),
		[search]
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

const ParamsCheckedSearch = () => (
	<ParamsChecker
		checkOption={({ "*": search }) => !!(search && search !== "")}
		redirect='/'
	>
		<Search />
	</ParamsChecker>
);

export default ParamsCheckedSearch;
