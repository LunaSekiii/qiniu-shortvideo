import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: {
				// 全局引入变量和 mixin
				additionalData: `@import "@/styles/variables.scss"; @import "@/styles/mixins.scss"; @import "@/styles/utils.scss";`,
			},
		},
	},
	// 路径别名
	resolve: {
		alias: {
			"@": "/src",
			style: "@/style",
		},
	},
});
