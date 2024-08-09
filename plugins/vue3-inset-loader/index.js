/*
 * @Author: 刘涛
 * @Date: 2024-02-28 10:32:40
 * @Last Modified by:   刘涛
 * @Last Modified time: 2024-02-28 10:32:40
 */
const { parse } = require("@vue/compiler-sfc");
const {
	generateScriptcCode,
	generateLabelCode,
	generateStyleCode,
	getPagesMap,
	initPages,
	getRoute,
} = require("./utils");

let _init = false;
let needHandle = false;
let pagesMap = {};

const myVitePlugin = {
	name: "vue3-inset-loader",
	transform(code, id) {
		if (!_init) {
			_init = true;
			init(this);
		}

		const route = getRoute(id);
		const curPage = pagesMap[route];

		if (id.endsWith(".vue") && needHandle && curPage) {
			const compiler = parse(code);
			const labelCode = generateLabelCode(curPage.label);
			let templateCode =
				compiler.descriptor && compiler.descriptor.template ? compiler.descriptor.template.content : "";
			templateCode = labelCode + templateCode;
			const style = generateStyleCode(
				compiler.descriptor && compiler.descriptor.styles ? compiler.descriptor.styles : []
			);
			const script = generateScriptcCode(code);
			// 重组style标签及内容
			code = `
        <template>
          <div>
          ${templateCode}
          </div>
        </template>
        ${script}
        ${style}
      `;
		}
		return {
			code,
			map: null, // 表示源码视图不作修改
		};
	},
};

function init(that) {
	needHandle = initPages(that);
	// Convert to a mapping object of routes and configurations
	if (needHandle) {
		pagesMap = getPagesMap();
	}
}

module.exports = myVitePlugin;
