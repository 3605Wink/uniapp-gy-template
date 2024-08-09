import { ref } from "vue";

/**
 * 自定义 Hook，用于实现轮询功能。
 * @param {Function} fn - 每次轮询时调用的函数。
 * @param {number} duration - 轮询间隔时间（以毫秒为单位）。
 * @param {boolean} autoStart - 是否在创建 Hook 时自动开始轮询。
 * @param {number} delayTime - 开始轮询前的延迟时间（以毫秒为单位）。
 * @returns {object} 包含轮询状态和方法的对象。
 */
export const usePolling = (
	fn: (args?: any) => void,
	duration: number = 1000,
	autoStart: boolean = false,
	delayTime: number = 0
) => {
	// 使用 ref 创建响应式的轮询状态
	const isPolling = ref(false);
	let timer: NodeJS.Timeout; // 存储 setTimeout 返回的计时器 ID
	// 使用 IIFE 确保每次调用 usePolling 都有独立的 pollArgs
	const { value: pollArgs } = (() => {
		const argsRef = ref<any>();
		return { value: argsRef };
	})();

	/**
	 * 执行轮询的函数。
	 */
	const poll = () => {
		try {
			// 尝试执行传入的函数
			fn(pollArgs.value);
		} catch (error) {
			// 如果发生错误，记录错误信息
			console.error("发生错误:", error);
		} finally {
			// 如果轮询状态为 true，设置下一个定时器
			if (isPolling.value) timer = setTimeout(poll, duration);
		}
	};

	/**
	 * 开始轮询的函数。
	 */
	const startPolling = (args?: any) => {
		// 如果已经处于轮询状态，则不执行操作
		if (isPolling.value) {
			console.log("轮询正在运行");
			return;
		}
		// 更新轮询状态为 true
		isPolling.value = true;
		// 保存参数
		pollArgs.value = args;
		// 执行轮询函数
		poll();
	};

	/**
	 * 停止轮询的函数。
	 */
	const stopPolling = () => {
		// 如果当前没有轮询，则不执行操作
		if (!isPolling.value) {
			console.log("轮询已经结束");
			return;
		}
		// 更新轮询状态为 false
		isPolling.value = false;
		// 清除定时器
		if (timer) clearTimeout(timer);
	};

	// 如果 autoStart 为 true，则在指定延迟后自动开始轮询
	if (autoStart) {
		(async () => {
			await new Promise(resolve => setTimeout(resolve, delayTime));
			startPolling();
		})();
	}

	// 返回包含轮询状态和方法的对象
	return {
		isPolling,
		startPolling,
		stopPolling,
	};
};
