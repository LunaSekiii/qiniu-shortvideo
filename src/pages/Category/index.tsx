import { VideoListType, getVideoListByCategory } from "@/apis/video";
import { VideoList } from "@/components/VideoList";
import HomePageLayout from "@/layouts/HomePageLayout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/**
 * 分类视频
 */
function Category() {
	const { categoryId } = useParams();

	const navigate = useNavigate();

	const [theList, setTheList] = useState<VideoListType | null>(null);

	useEffect(() => {
		const category = Number(categoryId);
		// categoryId合法性验证
		if (isNaN(category)) {
			return navigate("/category/1");
		}
		getVideoListByCategory({ categoryId: category, page: 1 }).then((res) =>
			setTheList(res)
		);
	}, [categoryId, navigate]);

	if (!theList) return <div></div>;

	return (
		<HomePageLayout>
			<VideoList {...theList} />
		</HomePageLayout>
	);
}

export default Category;
