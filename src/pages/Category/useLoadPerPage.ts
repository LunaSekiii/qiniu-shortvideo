import { useCallback, useMemo, useState } from "react";

type UseLoadPerPageProps<T> = {
	/** 加载数据方法 */
	loadData: (page: number, pageSize: number) => Promise<List<T>>;
	/** 初始页面 */
	page?: number;
	/** 页面大小 */
	pageSize?: number;
};

/**
 * 分页加载Hook
 */
function useLoadPerPage<T>(props: UseLoadPerPageProps<T>) {
	const {
		loadData,
		page: initialPage = 1,
		pageSize: initialPageSize = 10,
	} = props;

	const [dataList, setDataList] = useState<T[]>([]);

	/** 加载数据 */
	const getData = useMemo(() => {
		// 这里的isLoading是为了防止重复加载
		let isLoading = false;

		let page = initialPage;
		let hasMore = true;
		const pageSize = initialPageSize;
		setDataList([]);

		/**
		 * 获取数据方法
		 */
		const getData = async () => {
			if (!hasMore || isLoading) {
				return [];
			}
			isLoading = true;

			try {
				const list = await loadData(page, pageSize);
				// 这里避免state统一更新造成的首页重复问题
				if (page === initialPage) setDataList(list.list);
				else
					setDataList((preDataList) => preDataList.concat(list.list));
				console.log(`加载第${page}页，每页${pageSize}条`, list.list);
				hasMore = list.hasMore;
				page++;
				return list.list;
			} catch (e) {
				throw new Error("分页加载错误");
			} finally {
				isLoading = false;
			}
		};
		return getData;
	}, [initialPage, initialPageSize, loadData]);

	/** 重置 */
	const reset = useCallback(() => {
		setDataList([]);
		return getData();
	}, [getData]);

	return {
		data: dataList,
		getData,
		reset,
	};
}

export default useLoadPerPage;
