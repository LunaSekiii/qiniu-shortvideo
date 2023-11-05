import { SVGIconName } from "../SVGIcon";

export type MemuItem = {
	name: string;
	key: number | string;
	icon: SVGIconName;
};

export type MenuType = "category" | "";

const memuList: Record<MenuType, MemuItem[]> = {
	"": [
		{
			name: "首页",
			key: "",
			icon: "home",
		},
		{
			name: "推荐",
			key: "favourite",
			icon: "favourite",
		},
		{
			name: "关注",
			key: "person_add",
			icon: "person_add",
		},
		{
			name: "朋友",
			key: "group",
			icon: "group",
		},
		{
			name: "我的",
			key: "user/self",
			icon: "person",
		},
	],
	category: [
		// {
		// 	name: "直播",
		// 	key: "live_tv",
		// 	icon: "live_tv",
		// },
		{
			name: "宠物",
			key: 1,
			icon: "pet_supplies",
		},
		{
			name: "知识",
			key: 2,
			icon: "book",
		},
		{
			name: "解说",
			key: 3,
			icon: "theaters",
		},
		// {
		// 	name: "热点",
		// 	key: "fire",
		// 	icon: "fire",
		// },
		{
			name: "游戏",
			key: 4,
			icon: "sports_esports",
		},
		{
			name: "娱乐",
			key: 5,
			icon: "kid_star",
		},
		{
			name: "二次元",
			key: 6,
			icon: "cruelty_free",
		},
		{
			name: "音乐",
			key: 7,
			icon: "library_music",
		},
		{
			name: "美食",
			key: 8,
			icon: "dinner_dining",
		},
		{
			name: "体育",
			key: 9,
			icon: "sports_basketball",
		},
		{
			name: "时尚",
			key: 10,
			icon: "diamond",
		},
	],
};

export default memuList;
