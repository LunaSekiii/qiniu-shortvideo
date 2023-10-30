/**
 * 视频类型
 */
declare namespace Video {
	/**
	 * 视频信息
	 */
	interface VideoInfo extends VideointeractionState, VideoResource {
		/** 作者Id */
		userId: number;
		/** 视频分类Id */
		categoryId: number;
		/** 视频标签 */
		tags: TagType.Tag[];
		/** 视频统计信息 */
		count: VideoCount;
		/** 作者信息 */
		author: UserType.SimpleUserInfoDTO;
	}

	/**
	 * 视频统计数据
	 */
	interface VideoCount {
		/** 视频播放量 */
		viewCount: number;
		/** 视频评论数 */
		commentCount: number;
		/** 视频收藏数 */
		collectionCount: number;
		/** 视频点赞数 */
		praiseCount: number;
		/** 视频分享数 */
		// share: number;
		forwardCount: number;
	}
}

/** 视频交互状态 */
interface VideointeractionState {
	/** 是否已收藏 */
	collected: boolean;
	/** 是否已点赞 */
	parised: boolean;
	/** 是否已关注 */
	followed: boolean;
}

/** 视频资源 */
interface VideoResource {
	/** 视频Id */
	videoId: number;
	/** 视频标题 */
	title: string;
	/** 视频资源地址 */
	url: string;
	/** 视频资源格式 */
	format: string;
	/** 视频分辨率 */
	resolution: string;
	/** 视频描述 */
	thumbnail: string;
	/** 视频封面 */
	picture: string;
}
