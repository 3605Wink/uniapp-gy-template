export const useOnLoad = (callback?: (params: any) => void) => {
	// 获取当前页面路由信息
	const currentRoute = useCurrentPages();
	// #ifdef MP-WEIXIN
	// 启动场景值
	const { scene } = uni.getLaunchOptionsSync();
	console.log(scene, "scene");

	// 在组件挂载时执行回调函数
	onMounted(() => {
		if (callback && currentRoute) {
			const options = restoreComplexTypes(currentRoute.options);
			if (scene == 1011) {
				const { q } = options;

				if (q != "undefined") {
					const res = parseUrlQuery(decodeURIComponent(q));
					callback(res);
				}
			} else {
				callback(options);
			}
		}
	});
	// #endif

	// #ifdef MP-ALIPAY
	onMounted(() => {
		if (callback && currentRoute) {
			const options = restoreComplexTypes(currentRoute.options);
			callback(options);
		}
	});
	// #endif

	const restoreComplexTypes = (obj: Record<string, any>) => {
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				const value = obj[key];
				if (typeof value === "string") {
					try {
						const parsedValue = JSON.parse(value);
						if (parsedValue !== null && typeof parsedValue === "object") {
							obj[key] = parsedValue;
						}
					} catch (e) {
						// 如果解析失败，继续处理其他属性
					}
				}
			}
		}
		return obj;
	};
};
