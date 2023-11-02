/**
 * 响应类型
 */
declare namespace ResponseType {
	/**
	 * 响应
	 */
	interface Response<T> {
		status: Status;
		result: T;
	}
	interface getVideoListByCategoryRes {}
}

/** 响应状态 */
interface Status {
	/** 状态码 */
	code: number;
	/** 状态信息 */
	msg: string;
}
