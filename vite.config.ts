/* eslint-disable n/prefer-global/process */
import path, { resolve } from "node:path";

import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Components from "@uni-helper/vite-plugin-uni-components";
import AutoImport from "unplugin-auto-import/vite";
import Unocss from "unocss/vite";
import pxtorpx from "postcss-pxtorpx-pro";
import { NutResolver } from "nutui-uniapp";
import ReactivityTransform from "@vue-macros/reactivity-transform/vite";
import { uniRouteImport } from "vite-plugin-uni-route";
import viteInsetLoader from "vite-inset-loader";

const UNI_PLATFORM = {
	"app": "uni",
	"web": "uni",
	"mp-weixin": "wx",
	"mp-baidu": "swan",
	"mp-alipay": "my",
	"mp-toutiao": "tt",
	"mp-lark": "tt",
	"mp-qq": "qq",
	"mp-kuaishou": "ks",
	"mp-jd": "jd",
	"mp-360": "qh",
	"quickapp-webview-union": "qa",
	"quickapp-webview-huawei": "qa",
	"quickapp-webview": "qa",
};
export default defineConfig(async ({ mode }) => {
	const { VITE_BASE } = loadEnv(mode, "./");

	return {
		base: VITE_BASE,
		resolve: {
			alias: {
				"@/": `${resolve(__dirname, "src")}/`,
				"#/": `${resolve(__dirname, "types")}/`,
			},
		},
		plugins: [
			viteInsetLoader(),
			ReactivityTransform(),
			Components({
				dts: resolve(__dirname, "types/auto-components.d.ts"),
				globs: ["src/components/*/index.vue", "src/layout/*/index.vue"],
				resolvers: [NutResolver()],
			}),
			uniRouteImport({
				globs: "src/pages.json",
				dts: "types/auto-route.d.ts",
				routes: "src/router/index.json",
			}),
			uni(),
			Unocss({}),
			AutoImport({
				dts: resolve(__dirname, "types/auto-import.d.ts"),
				imports: [
					"pinia",
					"vue",
					"uni-app",
					{
						"@wsvaio/use": ["usePayload"],
						"@wsvaio/utils": ["merge", "sleep", "timeFormat", "dateFormat", "throttle", "debounce"],
						"vue-request": ["useRequest"],
					},
				],
				vueTemplate: true,
				defaultExportByFilename: true,
				dirs: [
					"src/utils/*/index.ts",
					"src/router/*.ts",
					"src/stores/*.ts",
					"src/module/*/index.ts",
					"src/apis/*/index.ts",
					"src/composables/*/*.ts",
					"src/modules/*/route.ts",
				],
			}),
		],
		define: {
			global: UNI_PLATFORM[process.env.UNI_PLATFORM!],
			wx: UNI_PLATFORM[process.env.UNI_PLATFORM!],
		},
		css: {
			postcss: {
				plugins: [
					pxtorpx({
						unit: "rpx",
						unitPrecision: 5,
						selectorBlackList: [],
						propBlackList: [],
						replace: true,
						mediaQuery: false,
						minPixelValue: 0,
						exclude: /node_modules/,
						transform: (x: any) => 2 * x,
					}),
				],
			},
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
					additionalData: `@import "${path.resolve(__dirname, "src/styles/main.less")}";`,
				},
				scss: {
					additionalData: '@import "nutui-uniapp/styles/variables.scss";',
				},
			},
		},
	};
});
