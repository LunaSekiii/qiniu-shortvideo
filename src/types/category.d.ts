/**
 * 分类
 */
declare namespace Category {
	/** 分类枚举 */
	enum CategoryEnum {
		"宠物",
		"知识",
		"解说",
		"游戏",
		"娱乐",
		"二次元",
		"音乐",
		"美食",
		"体育",
		"时尚",
	}

	type Category = keyof typeof CategoryEnum;
	type CategoryId = (typeof CategoryEnum)[Category];
}
