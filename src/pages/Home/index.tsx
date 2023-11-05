import { getVideoListByCategory } from "@/apis/video";
import VideoTile from "@/components/VideoTile";
import useLoadPerPage from "@/hooks/useLoadPerPage";
import HomePageLayout from "@/layouts/HomePageLayout";
import { useCallback } from "react";
import style from "./Home.module.scss";

function Home() {
	const loadData = useCallback(
		(page: number, pageSize: number) =>
			getVideoListByCategory({
				categoryId: Number(3),
				page,
				size: pageSize,
			}),
		[]
	);

	const { data, getData, reset } = useLoadPerPage<VideoType.VideoInfo>({
		loadData,
		pageSize: 30,
	});

	if (!data) return <div></div>;

	return (
		<HomePageLayout>
			<div className={style.home}>
				<div className={style["size-seat"]} />
				<VideoTile data={data} getData={getData} resetData={reset} />
			</div>
		</HomePageLayout>
	);
}

export default Home;
