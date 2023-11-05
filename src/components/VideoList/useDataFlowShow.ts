import { useCallback, useEffect, useMemo, useState } from "react";

type UseDataFlowShowProps<T> = {
	data: T[];
	getData: () => Promise<VideoType.VideoInfo[]>;
};

/**
 * 数据流Hook
 * @description 用于将流式的数据列表提供给组件
 */
function useDataFlowShow<T>(props: UseDataFlowShowProps<T>) {
	const { data, getData } = props;
	const [currentIndex, setCurrentIndex] = useState(0);

	// 重置currentIndex
	useEffect(() => {
		setCurrentIndex(0);
	}, [getData]);

	// 是否有上一页
	const hasPrev = useMemo(
		() => data.length > 0 && currentIndex > 0,
		[currentIndex, data]
	);
	// 是否有下一页
	const hasNext = useMemo(
		() => data.length > 0 && currentIndex < data.length - 1,
		[currentIndex, data]
	);

	// 当前展示的数据列表
	const [showDataList, setShowDataList] = useState<T[]>([]);

	// 初始化
	useEffect(() => {
		if (currentIndex !== 0) return;
		if (data.length > 2) {
			setShowDataList([data[0], data[1]]);
		} else {
			setShowDataList(data);
		}
	}, [currentIndex, data]);

	// 切换数据
	const switchData = useCallback(
		(direction: "prev" | "next" = "next") => {
			if (direction === "prev" && !hasPrev) return;
			if (direction === "next" && !hasNext) return;

			setCurrentIndex((prev) => {
				if (direction === "next") {
					return prev + 1;
				}
				return prev - 1;
			});
		},
		[hasNext, hasPrev]
	);

	// 数据流监听
	useEffect(() => {
		// 将data的currentIndex上下三项数据覆盖showDataList，注意边界
		const prev = data[currentIndex - 1];
		const current = data[currentIndex];
		const next = data[currentIndex + 1];
		// 过滤掉undefined
		const list = [prev, current, next].filter((item) => item);
		console.log(list, currentIndex);

		setShowDataList(list);

		// 如果当前数据距离数据尾部四项及以下，且有下一页数据，则获取下一页数据
		if (currentIndex >= data.length - 4) {
			getData();
			// TODO: 尾判
		}
	}, [currentIndex, data, hasNext, hasPrev, getData]);

	return {
		switchData,
		showDataList,
		hasNext,
		hasPrev,
	};
}

export default useDataFlowShow;
