import { getVideoListByCategory } from "@/apis/video";
import { VideoList } from "@/components/VideoList";
import HomePageLayout from "@/layouts/HomePageLayout";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLoadPerPage from "./useLoadPerPage";

/**
 * 分类视频
 */
function Category() {
	const { categoryId } = useParams();

	const navigate = useNavigate();

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

	useEffect(() => {
		const category = Number(categoryId);
		// categoryId合法性验证
		if (isNaN(category)) {
			return navigate("/category/1");
		}
		reset();
	}, [categoryId, navigate]);

	if (!data) return <div></div>;

	return (
		<HomePageLayout>
			<VideoList data={data} getData={getData} resetData={reset} />
		</HomePageLayout>
	);
}

export default Category;
