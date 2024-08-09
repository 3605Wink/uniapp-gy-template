/* eslint-disable jsdoc/check-param-names */
import router from "@/router/index.json";
import type { Page } from ".";
export enum CloseTypes {
	default = "default",
	current = "current",
	all = "all",
}

type RoutePath = Path;
interface RouterParams {
	path?: Path;
	params?: Record<string, any>;
	close?: keyof typeof CloseTypes;
}

/**
 * @param {string} [params.path] - 单页面路由文件名
 * @param {object} [params.params] - 路由传递的参数对象
 * @param {'default' | 'current' | 'all'} [params.close] - 页面关闭方式，不传为"默认default"。
 *   - default: 不关闭任何页面直接跳转
 *   - current: 关闭当前页后跳转
 *   - all: 关闭所有页面后跳转
 */
export function useRouter(data: Path): void;
export function useRouter(data: RouterParams): void;

export function useRouter(data: Path | RouterParams): void {
	const {
		path = "",
		params = {},
		close = "default",
	} = typeof data === "string" ? { path: data } : (data as RouterParams);

	const pathList = router.subPackages
		? [
				...router.pages,
				...router?.subPackages.flatMap((item: { pages: Page[]; root: string }) => {
					return item?.pages?.map(page => {
						return {
							...page,
							type: page?.type,
							path: `${item?.root}/${page.path}`,
						};
					});
				}),
		  ]
		: router.pages;

	const routeList = pathList.filter(item => item.name === path.trim());
	if (routeList?.length == 0) throw new Error("找不到匹配路由");
	if (routeList?.length > 1) throw new Error("路由name相同");

	let route = routeList[0];
	if (route.type === "tabBar") {
		if (Object.keys(params).length > 0) console.warn("跳转tabBar页不需要传递参数");

		uni.switchTab({ url: `/${route.path}` });
	} else {
		const paramsString = Object.keys(params).length > 0 ? `?${param(params)}` : "";
		const url = `/${route.path}${paramsString}`;

		switch (close) {
			case "default":
				uni.navigateTo({ url });
				break;
			case "current":
				uni.redirectTo({ url });
				break;
			case "all":
				uni.reLaunch({ url });
				break;
		}
	}
}

// 递归将多维数组扁平化
const flattenArray = (arr: any[]): any[] => {
	return arr.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val)), []);
};

const param = (data: Record<string, any>) => {
	function isComplexOrArrayType(value: any) {
		return (typeof value === "object" && value !== null) || typeof value === "function" || Array.isArray(value);
	}
	return Object.entries(data)
		.filter(([, value]) => value !== undefined)
		.map(([key, value]) => {
			if (isComplexOrArrayType(value)) {
				return `${key}=${JSON.stringify(value)}`;
			} else {
				return `${key}=${value as string | number | boolean}`;
			}
		})
		.join("&");
};

// 定义页面元数据接口
interface PageRoute {
	route: string;
}
// 定义页面实例数组类型
type PageInstances = (Page.PageInstance<AnyObject, PageRoute> & PageRoute)[];
export const getPrevPath = (): {
	path: Path | "home";
	params: any;
} => {
	// 获取当前页面实例数组
	const pages: PageInstances = getCurrentPages();
	// 如果只有一个页面直接返回
	if (pages.length <= 1) {
		return {
			path: "home",
			params: {},
		};
	}
	// 获取前一个页面实例
	const previousPage = pages[pages.length - 2];

	// 验证实例是否存在
	if (!previousPage) {
		return {
			path: "home",
			params: {},
		};
	}
	// 拆解route属性方便读取
	const { route: previousRoute } = previousPage;
	// 返回路由段或默认值
	return {
		path: (previousRoute?.split("/")[1] as Path) || "home",
		params: (previousPage as any)?.options,
	};
};
