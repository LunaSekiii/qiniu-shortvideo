import { getVideoListByCategory } from "@/apis/video";
import { VideoList } from "@/components/VideoList";
import useLoadPerPage from "@/hooks/useLoadPerPage";
import { useCallback } from "react";

/**
 * 推荐页面
 */
function Recommend() {
	const loadData = useCallback(
		(page: number, pageSize: number) =>
			getVideoListByCategory({
				categoryId: -1,
				page,
				size: pageSize,
			}),
		[]
	);

	const { data, getData, reset, updateData } =
		useLoadPerPage<VideoType.VideoInfo>({
			loadData,
			pageSize: 30,
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

export default Recommend;
