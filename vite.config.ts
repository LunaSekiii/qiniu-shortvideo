import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
	// 环境变量
	const env = loadEnv(mode, process.cwd());
	console.log(env);
	return defineConfig({
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
		server: {
			// 代理
			proxy: {
				// 用户服务
				"/api/us": {
					target: env.VITE_USER_SERVER_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api\/us/, ""),
				},
				// 视频服务
				"/api/vs": {
					target: env.VITE_VIDEO_SERVER_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api\/vs/, ""),
				},
			},
		},
	});
};
