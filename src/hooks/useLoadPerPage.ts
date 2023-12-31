import { useCallback, useMemo, useState } from "react";

type UseLoadPerPageProps<T> = {
	/** 加载数据方法 */
	loadData: (page: number, pageSize: number) => Promise<List<T>>;
	/** 初始页面 */
	page?: number;
	/** 页面大小 */
	pageSize?: number;
	/** 初始数据（兼容分页接口） */
	initialData?: T[];
	/** 唯一key */
	uniqueKey?: keyof T;
};

/**
 * 分页加载Hook
 */
function useLoadPerPage<T>(props: UseLoadPerPageProps<T>) {
	const {
		loadData,
		page: initialPage = 1,
		pageSize: initialPageSize = 10,
		initialData,
		uniqueKey,
	} = props;

	const [dataList, setDataList] = useState<T[]>(initialData || []);

	const [resetFlag, setResetFlag] = useState(0);

	/** 加载数据 */
	const getData = useMemo(() => {
		// 这里的isLoading是为了防止重复加载
		let isLoading = false;
		console.log(`第${resetFlag}次重置，初始页码${initialPage}`);

		let page = initialPage;
		let hasMore = true;
		const pageSize = initialPageSize;
		setDataList(initialData || []);

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
				if (page === initialPage)
					setDataList(
						initialData && uniqueKey
							? initialData.concat(
									list.list.filter(
										(i) =>
											i[uniqueKey] !=
											initialData[0][uniqueKey]
									)
									// eslint-disable-next-line no-mixed-spaces-and-tabs
							  )
							: list.list
					);
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
	}, [initialData, initialPage, initialPageSize, loadData, resetFlag]);

	/** 重置 */
	const reset = useCallback(() => {
		setDataList(initialData || []);
		setResetFlag((preResetFlag) => preResetFlag + 1);
		return getData();
	}, [getData, initialData]);

	/**
	 * 修改数据（用户对视频的交交互需要修改）
	 */
	const updateData = useCallback(
		(index: number, data: T) => {
			// 如果index超出范围，返回false
			if (index < 0 || index >= dataList.length) return false;
			// 为了降低耦合,这里对data做直接修改
			setDataList((preDataList) => {
				const newDataList = [...preDataList];
				newDataList[index] = data;
				return newDataList;
			});
			return true;
		},
		[dataList.length]
	);

	return {
		data: dataList,
		getData,
		reset,
		updateData,
	};
}

export default useLoadPerPage;
