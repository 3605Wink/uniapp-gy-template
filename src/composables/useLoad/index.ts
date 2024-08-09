// 定义Pload类型，它继承自T类型的所有属性，并添加Ref<T>的类型，同时保留任意其他属性
export type PayloadType<T extends Record<any, any> = Record<any, any>> = {} & T & Ref<T> & Record<any, any>;

// 定义LoadKey类型，它是InjectionKey的类型别名，用于注入和提供
type LoadKey<T> = InjectionKey<Ref<T>>;

// 创建一个Symbol作为独一无二的key，用于在provide/inject模式下识别
const createLoadKey = Symbol("loadKey");

/**
 * useLoad函数用于在Vue的Composition API中创建一个可以在组件间提供/注入的数据载荷。
 * @param {("provide" | "inject")} $mode - 模式选择，'provide'为提供模式，'inject'为注入模式。
 * @param {Initial} [params={}] - 初始载荷对象，默认为空对象。
 * @returns {PayloadType<Initial>} - 返回一个具有响应式特性的载荷对象。
 */
export const useLoad = <Initial extends object>(
	$mode: "provide" | "inject",
	params: Initial = {} as Initial
): PayloadType<Initial> => {
	// 创建一个InjectionKey用于当前类型的载荷
	let $key: LoadKey<Initial> = createLoadKey;

	// 声明一个payload变量，用于存储响应式数据
	let payload: PayloadType<Initial>;

	// 根据模式，决定是注入还是提供数据
	if ($mode === "inject") {
		// 注入模式：尝试从上级组件注入数据，如果未找到，则返回一个空的响应式对象
		payload = inject<PayloadType<Initial>>($key) || ({} as PayloadType<Initial>);
		if (!payload) {
			throw new Error("注入依赖失败");
		}
	} else {
		// 提供模式：创建一个响应式对象，并使用provide方法将其提供给下级组件
		payload = reactive({ ...params }) as unknown as PayloadType<Initial>;
		provide($key, payload);
	}

	// 返回payload对象
	return payload;
};
