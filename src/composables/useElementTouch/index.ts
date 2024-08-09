/**
 * 返回一个包含元素触摸相关功能的对象
 * @returns {object} 元素触摸相关功能对象
 */
export const useElementTouch = () => {
	// 生成随机的元素ID
	const refRandomId = Math.random().toString(36).slice(-8);

	// 创建元素的引用和ID
	const elementRef = ref<HTMLElement>();
	const elementId = `ContentRef-${refRandomId}`;

	// 创建元素的尺寸引用，并异步初始化尺寸
	const elementRefRect = ref({ width: 0, height: 0 });
	const initElementWidth = async () => {
		useUniRect(elementRef, elementId).then((rect: any) => {
			elementRefRect.value.width = rect.width || 0;
			elementRefRect.value.height = rect.height || 0;
		});
	};

	// 在组件挂载后初始化元素尺寸
	onMounted(() => {
		setTimeout(() => {
			initElementWidth();
		}, 100);
	});

	// 创建触摸状态的响应式对象
	const touchState = reactive({
		offset: 0,
		moving: false,
	});

	// 创建触摸事件处理的对象
	const touch = useTouch();
	let position: "bottom" | "top" | string = "";

	// 设置偏移量
	const setOffset = (deltaX: number, deltaY: number) => {
		let offset = deltaX;
		position = deltaY > 0 ? "bottom" : "top";
		offset = deltaY;
		offset = (Math.abs(offset) / elementRefRect.value?.height) * 100;

		if (offset > 85) offset = 85;

		switch (position) {
			case "top":
				break;
			case "bottom":
				offset = -offset;
				break;
		}

		touchState.offset = offset;
	};

	// 创建状态引用
	const state = ref<boolean | null>(null);

	// 创建触摸方法
	const touchMethods = {
		onTouchStart(event: TouchEvent) {
			touch.start(event);
		},
		onTouchMove(event: TouchEvent) {
			touch.move(event);
			touchState.moving = true;
			setOffset(touch.deltaX.value, touch.deltaY.value);

			if (touch.isVertical()) {
				event.preventDefault();
				event.stopPropagation();
			}
		},
		onTouchEnd() {
			if (touchState.moving) {
				touchState.moving = false;
				switch (position) {
					case "top":
						if (touchState.offset > 10) state.value = true;
						else state.value = false;

						break;
					case "bottom":
						if (touchState.offset < -10) state.value = false;

						break;
				}
			}
		},
	};

	return {
		elementId,
		touchMethods,
		elementRef,
		touchState,
		elementRefRect,
		state,
	};
};
