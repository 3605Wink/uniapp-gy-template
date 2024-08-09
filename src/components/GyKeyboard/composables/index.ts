import type { SetupContext } from "vue";
import type { CarKeyboardItem, FillDataFunction, keyboardProps } from "..";
import type { KeyboardEmits } from "../index";
import { carKeyboardCnData, carKeyboardEnData, carKeyboardSpecialData } from "../car-data";

export const useKeyboard = (props: keyboardProps, emits: SetupContext<KeyboardEmits>["emit"]) => {
	// 用户输入的值
	const inputValue = ref<string>(props.modelValue || "赣");
	// 用于标记省份简称键盘与abc123键盘
	const keyboardToggle = ref<"province" | "abc123">("province");
	// 省份简称与abc123键盘切换
	const isSwitch = computed(() => {
		return inputValue.value.length == 0 && !carKeyboardCnData.includes(inputValue.value.slice(0, 1));
	});
	// // 车牌类型与车牌数量
	let num = ref<number>(7);
	watch(() => props.type, val => {
		num.value = props?.type == "newEnergy" ? 8 : 7;
	});
	// 赋值
	watch(
		() => props.modelValue,
		val => {
			inputValue.value = val;
			if (inputValue.value.length == 0)
				keyboardToggle.value = "province";
			else
				if (inputValue.value.length == 1 && carKeyboardCnData.includes(inputValue.value.slice(0, 1)))
					keyboardToggle.value = "abc123";
		}
	);
	// 键盘弹出关闭事件
	const popupCloseEvent = () => {
		emits("close");
		emits("update:show", false);
	};
	// 键盘点击事件
	const keyboardClickEvent = (value: CarKeyboardItem["value"], disabled: CarKeyboardItem["disabled"]) => {
		if (disabled) return;
		console.log((props?.type == "newEnergy" ? 8 : 7));

		let concatValue = true;
		if (value === "confirm") {
			popupCloseEvent();
			emits("confirm");
			return;
		} else if (value === "cancel") {
			popupCloseEvent();
			return;
		} else if (value === "reset") {
			emits("update:modelValue", "");
			return;
		} else {
			if (inputValue.value.length >= num.value) return;
			uni.vibrateShort();
			if (concatValue)
				inputValue.value += value;
		}

		emits("update:modelValue", inputValue.value);
		nextTick(() => {
			emits("change", inputValue.value);
		});
	};
	// 键盘切换
	const switchKeyboard = () => {
		if (!isSwitch.value)
			keyboardToggle.value == "province" ? 	keyboardToggle.value = "abc123" : 	keyboardToggle.value = "province";
	};
	// 单独处理删除事件
	const backspaceEvent = () => {
		if (inputValue.value === "")
			return;

		uni.vibrateShort();
		inputValue.value = inputValue.value.slice(0, -1);

		emits("backspace");
		emits("update:modelValue", inputValue.value);
		nextTick(() => {
			emits("change", inputValue.value);
		});
	};
	// 渲染键盘数据
	const carKeyboardData = computed(() => {
		return () => {
			const data: CarKeyboardItem[][] = [];

			// 定义填充数据的函数
			const _fillCarKeyboardData: FillDataFunction = rawData => {
				return rawData.map(item => {
					return {
						value: item,
						disabled: carKeyboardSpecialData.includes(item),
					};
				});
			};

			// 填充数据到 data 数组中
			const fillCnData: any = _fillCarKeyboardData(keyboardToggle.value == "province" ? carKeyboardCnData : carKeyboardEnData);
			data.push(
				fillCnData.slice(0, 10),
				fillCnData.slice(10, 20),
				fillCnData.slice(20, 30),
				fillCnData.slice(30, 37)
			);

			return data;
		};
	});

	return {
		keyboardClickEvent,
		backspaceEvent,
		switchKeyboard,
		isSwitch,
		carKeyboardData,
		keyboardToggle,
		inputValue,

	};
};

/**
 * 车牌号校验
 */
export const isCarNo = (value: string): boolean => {
	// 新能源车牌
	const xreg
    = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
	// 旧车牌
	const creg
    = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
	if (value.length === 7)
		return creg.test(value);
	else if (value.length === 8)
		return xreg.test(value);
	else
		return false;
};
