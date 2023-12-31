import { getVideoListByCategory } from "@/apis/video";
import VideoTile from "@/components/VideoTile";
import useLoadPerPage from "@/hooks/useLoadPerPage";
import { useCallback } from "react";

function Home() {
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
		<VideoTile
			data={data}
			getData={getData}
			resetData={reset}
			updateData={updateData}
		/>
	);
}

export default Home;
