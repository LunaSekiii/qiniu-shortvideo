import { getVideoDetail } from "@/apis/video";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function useShareVideo() {
	// 从search中获取vid
	const [search] = useSearchParams();
	const vid = search.get("vid");

	// 检测，每当路由路径发生变化时，重新获取视频信息
	const path = window.location.pathname;

	const [shareVideo, setShareVideo] = useState<VideoType.VideoInfo[]>();

	useEffect(() => {
		if (!vid || isNaN(Number(vid))) return setShareVideo(undefined);
		getVideoDetail(Number(vid)).then((res) => {
			setShareVideo([res.video]);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [vid, path]);

	return shareVideo;
}

export default useShareVideo;
