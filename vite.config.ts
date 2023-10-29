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
				"/api": {
					target: env.VITE_BASE_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
	});
};
