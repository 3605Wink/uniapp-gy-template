import antfu from "@antfu/eslint-config";
import eslintConfigPrettier from "eslint-config-prettier";
export default [
	antfu({
		stylistic: {
			indent: 2,
			quotes: "single",
		},
		typescript: true,
		vue: true,
		unocss: true,
	}),
	eslintConfigPrettier,
];
