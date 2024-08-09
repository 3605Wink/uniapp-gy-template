/**
  获取元素的大小及其相对于视口的位置，等价于 Element.getBoundingClientRect。
  width 宽度	number
  height 高度	number
  top	顶部与视图窗口左上角的距离	number
  left	左侧与视图窗口左上角的距离	number
  right	右侧与视图窗口左上角的距离	number
  bottom	底部与视图窗口左上角的距离	number
 */
import { nextTick, onMounted, reactive } from "vue";

export const useUniRectById = id => {
	const rect = reactive({
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: 0,
		height: 0,
	});

	onMounted(() => {
		nextTick(() => {
			const query = uni.createSelectorQuery();
			query
				.select(`#${id}`)
				.boundingClientRect((res: any) => {
					if (res) {
						rect.top = res.top;
						rect.left = res.left;
						rect.right = res.right;
						rect.bottom = res.bottom;
						rect.width = res.width;
						rect.height = res.height;
					}
				})
				.exec();
		});
	});

	return rect;
};

function isWindow(val: unknown): val is Window {
	return val === window;
}

export const useUniRect = (elementRef?: (Element | Window | any) | Ref<Element | Window | any>, elementId?: string) => {
	let element = unref(elementRef);

	return new Promise((resolve, reject) => {
		if (uni.getSystemInfoSync().uniPlatform === "web") {
			if (element && element.$el)
				element = element.$el;

			if (isWindow(element)) {
				const width = uni.getSystemInfoSync().windowWidth;
				const height = uni.getSystemInfoSync().windowHeight;
				resolve({
					top: 0,
					left: 0,
					right: width,
					bottom: height,
					width,
					height
				});
			}
			if (element && element.getBoundingClientRect)
				resolve(element.getBoundingClientRect());
		} else {
			const query = uni.createSelectorQuery();
			if (elementId) {
				query
					.select(`#${elementId}`)
					.boundingClientRect()
					.exec(rect => {
						console.log(rect);

						if (rect[0])
							resolve(rect[0]);
					});
			}
		}
	});
};
