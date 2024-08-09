// uno.config.ts
import presetWeapp from "unocss-preset-weapp";
import { extractorAttributify, transformerClass } from "unocss-preset-weapp/transformer";
import { presetAttributify, presetIcons } from "unocss";

const { presetWeappAttributify, transformerAttributify } = extractorAttributify();
export default {
	presets: [
		presetWeapp(),
		presetWeappAttributify(),
		presetIcons({
			mode: "mask",
			prefix: "i-",
			extraProperties: {
				"display": "inline-block",
				"vertical-align": "middle",
			},
		}),
		presetAttributify({})
	],
	theme: {
		// 解决小程序不支持 * 选择器
		preflightRoot: ["page,::before,::after"]
	},
	rules: [["w-calc-32px", { width: "calc(100% - 32px)" }]],
	shortcuts: [
		{
			"border-base": "border border-gray-500_10",
			"center": "flex justify-center items-center",
		},
	],

	transformers: [transformerAttributify(), transformerClass()],
};
