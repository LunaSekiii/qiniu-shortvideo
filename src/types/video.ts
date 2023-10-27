/** 视频资源对象 */
export interface VideoResource {
	/** 视频Id */
	videoId: number;
	/** 视频资源地址 */
	url: string;
	/** 视频资源格式 */
	format: string;
	/** 视频资源清晰度 */
	quality: string;
}

/** 视频信息对象 */
export interface VideoInfo {
	/** 视频Id */
	videoId: number;
	/** 视频标题 */
	title: string;
	/** 视频描述 */
	thumbnail: string;
	/** 视频资源列表 */
	resources: Array<VideoResource>;
	/** 视频封面 */
	cover: string;
	/** 视频分类 */
	category: string;
	/** 视频标签 */
	tags: string[];
	/** 视频统计信息 */
	stat: {
		/** 视频播放量 */
		view: number;
		/** 视频评论数 */
		reply: number;
		/** 视频收藏数 */
		favorite: number;
		/** 视频点赞数 */
		like: number;
		/** 视频分享数 */
		share: number;
	};
	/** 用户交互信息 */
	interaction?: {
		/** 是否已收藏 */
		favorite: boolean;
		/** 是否已点赞 */
		like: boolean;
		/** 是否已关注 */
		follow: boolean;
	};
	/** 作者信息 */
	author: {
		/** 作者Id */
		userId: number;
		/** 作者名 */
		userName: string;
		/** 作者头像 */
		avatar: string;
	};
}
