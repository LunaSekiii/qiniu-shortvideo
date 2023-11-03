import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type PlayOption = {
	// 播放模式
	playMode: number;
	// 播放速度
	playSpeed: number;
	// 播放音量
	playVolume: number;
	// 播放画质
	playQuality: number;
	// 是否静音
	playMute: number;
};

type PlayOptionStore = {
	playOption: PlayOption;
	setPlayOption: (playOption: Partial<PlayOption>) => void;
};

/**
 * 播放器配置
 */
const usePlayOptionStore = create(
	persist<PlayOptionStore>(
		(set) => ({
			playOption: {
				playMode: 0,
				playSpeed: 1,
				playVolume: 0.5,
				playQuality: -1,
				playMute: 0,
			},
			setPlayOption: (playOption) =>
				set((store) => ({
					playOption: { ...store.playOption, ...playOption },
				})),
		}),
		{
			name: "playOption",
			storage: createJSONStorage(() => localStorage),
		}
	)
);

export default usePlayOptionStore;
