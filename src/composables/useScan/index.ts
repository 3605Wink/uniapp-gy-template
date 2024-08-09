/**
 * 分割 URL，获取查询参数。
 *
 * @param url 需解析的 URL。
 * @returns 包含查询参数的对象。
 */
const parseUrlQuery = (url: string): { [key: string]: string } => {
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

export const useScan = () => {
	return new Promise<UniApp.ScanCodeSuccessRes | any>((resolve, reject) => {
		uni.scanCode({
			success: res =>
				resolve({
					...res,
					query: parseUrlQuery(res.result),
				}),
			fail: err => reject(err),
		});
	});
};
