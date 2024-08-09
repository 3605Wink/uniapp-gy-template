import { useLoadMore } from "vue-request";
import { merge, sleep } from "@wsvaio/utils";

// 定义参数类型接口
interface paramsType {
	limit?: number; // 分页限制，可选
	page?: number; // 当前页码，可选
	[key: string]: any; // 其他任意参数
}

interface FuncType {
	dropDownStatus: Ref<boolean>;
	bottomLoadMore: () => void;
	dropDownRefresh: () => void;
	triggerPullDown: (e: any) => void;
	refresh: () => void;
	noMore: Ref<boolean>;
	dataList: Record<string, any>;
	run: (params?: { [key: string]: any }) => void;
	scrollId: Ref<string>;
	freeScroll: () => void;
	isFirstLoad: Ref<boolean>;
	vHeight: Ref<number | undefined>;
	scrollTop: Ref<number | undefined>;
}

/**
 * 封装一个通用的加载更多逻辑
 * @param {Function} func - 异步函数，用于请求数据
 * @param {paramsType} params - 请求参数
 * @returns {object} 包含下拉刷新、加载更多等操作的对象
 */
export default (
	func: (...args: any[]) => Promise<any>,
	params?: paramsType,
	option?: {
		manual: boolean;
		method: "POST" | "GET";
	}
): FuncType => {
	// 参数校验
	if (typeof func !== "function") throw new Error('The "func" parameter must be a function.');

	// 初始化最终请求参数
	let finalParams = reactive({
		...params,
		limit: params?.limit || 10,
		page: params?.page || 1,
	});
	let scrollTop = ref(0);
	// scroll滚动条位置
	let scrollId = ref("card0");
	// 判断是否为第一次加载
	let isFirstLoad = ref(true);
	// 下拉刷新状态
	let dropDownStatus = ref(false);
	// 计算高度
	let vHeight = ref<number | undefined>();

	// 防止在短时间内多次执行方法
	const isOperationInProgress = ref(false);

	// 使用useRect来获取元素高度的函数，此处假设已定义
	onMounted(async () => {
		const data = await useRect(".paging");

		vHeight.value = data?.height;
		if (vHeight.value) {
			if (!option?.manual) {
				await nextTick(() => {
					// 封装平台特定代码
					manualTrigger();
				});
			}
		}
	});

	// 封装平台特定代码
	const manualTrigger = () => {
		// #ifdef MP-WEIXIN
		dropDownStatus.value = true;
		// #endif
		// #ifdef MP-ALIPAY
		refresh();
		// #endif
	};

	// 使用useLoadMore来处理加载更多逻辑
	const { refresh, loadMore, noMore, dataList } = useLoadMore(
		async q => {
			try {
				// 合并请求参数，并增加页码
				merge(finalParams, { page: q?.page ? q?.page + 1 : 1 });
				let pamars = option?.method == "GET" ? { q: finalParams } : { b: finalParams };
				const { data: result } = await func(pamars);

				// 返回数据列表、当前页码和总条数
				return {
					list: result.list,
					page: finalParams.page,
					count: result.totalCount,
				};
			} catch (error) {
				console.error("Failed to fetch data:", error);
				throw error; // 重新抛出异常，以便调用者可以捕获
			}
		},
		{
			isNoMore: data => !!data && data.list.length >= data.count,
			manual: true, // 手动控制加载更多
			async onSuccess() {
				if (isFirstLoad.value) {
					isFirstLoad.value = false;
					await sleep(300);
					dropDownStatus.value = false;
				}
			},
			async onError() {
				if (isFirstLoad.value) {
					isFirstLoad.value = false;
					await sleep(300);
					dropDownStatus.value = false;
				}
			},
		}
	);

	// 触底加载更多
	const bottomLoadMore = () => {
		if (isOperationInProgress.value) return;
		isOperationInProgress.value = true;
		setTimeout(() => {
			loadMore();
			isOperationInProgress.value = false;
		}, 500);
	};

	// 下拉刷新
	const dropDownRefresh = () => {
		if (isOperationInProgress.value) return;
		isOperationInProgress.value = true;
		setTimeout(() => {
			dropDownStatus.value = false;
			isOperationInProgress.value = false;
			refresh();
		}, 1000);
	};

	// 触发下拉
	const triggerPullDown = e => {
		if (e.detail.dy >= 20) dropDownStatus.value = true;
	};

	// 重新请求

	const run = (params?: { [key: string]: any }, callback?: (info?: any) => void) => {
		console.log(params);

		merge(finalParams, {
			page: 1,
			limit: 10,
			...params,
		});
		refresh();
		callback?.("手动触发成功");
		scrollId.value = "card0";
	};

	const freeScroll = () => {
		scrollId.value = "card";
	};

	// 下拉刷新
	onPullDownRefresh(() => {
		if (isOperationInProgress.value) return;
		isOperationInProgress.value = true;
		setTimeout(() => {
			uni.stopPullDownRefresh();
			isOperationInProgress.value = false;
			refresh();
		}, 1000);
	});

	return {
		scrollTop,
		dropDownStatus,
		bottomLoadMore,
		dropDownRefresh,
		triggerPullDown,
		refresh,
		noMore,
		dataList,
		run,
		scrollId,
		freeScroll,
		isFirstLoad,
		vHeight,
	};
};
