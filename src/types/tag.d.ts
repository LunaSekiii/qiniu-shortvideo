/**
 * 标签类型
 */
declare namespace TagType {
	/** 标签对象 */
	interface Tag {
		/** 标签Id */
		tagId: number;
		/** 标签名 */
		tag: string;
		/** 标签状态 */
		status: number;
		/** 是否选中 */
		selected: boolean;
	}
}
