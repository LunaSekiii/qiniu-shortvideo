import { useMemo } from "react";
import useLoginStore from "./useLoginStore";

/**
 * 初始化 store
 */
function useInitStore() {
	const getUserInfo = useLoginStore((state) => state.getUserInfo);
	const init = useMemo(() => {
		// 初始化用户信息
		getUserInfo();
		return true;
	}, [getUserInfo]);
	return init;
}

export default useInitStore;
