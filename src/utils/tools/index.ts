export const filterObject = (obj: { [key: string]: any }) => {
	if (obj?._gsap == undefined) return obj;

	const filtered = { ...obj };

	if (filtered._gsap)
		delete filtered._gsap;

	return filtered;
};

/**
 * 获取静态资源 URL。
 *
 * @param path 静态资源路径。
 * @returns 完整的静态资源 URL。
 */
export const staticUrl = (path: string): string => {
	const VITE_STATIC_IMAGE_URL = import.meta.env.VITE_STATIC_IMAGE_URL;
	return `${VITE_STATIC_IMAGE_URL}${path}`;
};

interface PageRoute {
	route: string;
}

export const getPreviousPagePath = (): string => {
	const pages: (Page.PageInstance<AnyObject, PageRoute> & PageRoute)[] = getCurrentPages(); // 当前页面
	if (pages.length <= 1) {
		return "home";
	} else {
		const previousPage: (Page.PageInstance<AnyObject, PageRoute> & PageRoute) | undefined = pages[pages.length - 2]; // 获取前一个页面实例
		const previousPageRoute: string | undefined = previousPage?.route;
		return previousPageRoute?.split("/")[1] || "home";
	}
};

/**
 * 分割 URL，获取查询参数。
 *
 * @param url 需解析的 URL。
 * @returns 包含查询参数的对象。
 */
export const parseUrlQuery = (url: string): { [key: string]: string } => {
	const queryStart = url.indexOf("?");
	if (queryStart === -1) return {};

	const queryEnd = url.indexOf("#");
	const query = queryEnd === -1 ? url.slice(queryStart + 1) : url.slice(queryStart + 1, queryEnd);
	const pairs = query.split("&");
	const result: { [key: string]: string } = {};
	for (let i = 0; i < pairs.length; i++) {
		const pair = pairs[i].split("=");
		const key = decodeURIComponent(pair[0]);
		const value = pair.length > 1 ? decodeURIComponent(pair[1]) : "";
		if (key.length) result[key] = value;
	}
	return result;
};
