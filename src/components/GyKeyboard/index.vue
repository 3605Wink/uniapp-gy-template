<script lang="ts" setup>
import gsap from "gsap";
import type { keyboardProps } from "./index.d";

import { useKeyboard } from "./composables/index";
import { keyboardEmits } from "./index";

interface Props extends keyboardProps {}

const props = defineProps<Props>();
const emits = defineEmits(keyboardEmits);
const animation = reactive({
	transform: "translate3d(0px, 100%, 0px)",
	opacity: 0,
});

watch(
	() => props.show,
	(newValue, oldValue) => {
		if (newValue != oldValue) {
			if (newValue) {
				gsap.to(animation, {
					duration: 0.3,
					transform: "translate3d(0px, 0px, 0px)",
					ease: "power1.out",
					opacity: 1,
				});
			} else {
				gsap.to(animation, {
					duration: 0.2,
					transform: "translate3d(0px, 100%, 0px)",
					ease: "power1.out",
					opacity: 0,
				});
			}
		}
	}
);

const { keyboardClickEvent, backspaceEvent, carKeyboardData, isSwitch, keyboardToggle, inputValue, switchKeyboard } =
	useKeyboard(props, emits);

// 处理车牌格式
const licensePlateNumber = $computed(() => {
	return inputValue.value.length >= 3
		? `${inputValue.value.slice(0, 2)}·${inputValue.value.slice(2)}`
		: inputValue.value;
});
// // 判断是什么车牌
// const carNoStyle = $computed(() => {
// 	return carType ? "#1BBC80" : "#328EFE";
// });
</script>

<template>
	<div class="gy-keyboard" :style="filterObject(animation)" @click.stop>
		<!-- <div class="car-no">
			<image class="h-100%" src="./img/car.svg" mode="heightFix" />
			<div
				class="car-no-item" :style="{
					color: carNoStyle,
				}"
			>
				{{ licensePlateNumber }}
			</div>
		</div> -->
		<div class="operation">
			<div class="operation-stow" @click="keyboardClickEvent('cancel', false)">
				<GyIcon name="i-ep-arrow-down-bold" color="#666666" size="16" />
			</div>
			<div class="operation-reset" @click="keyboardClickEvent('reset', false)">重置</div>
			<div class="operation-confirm" @click="keyboardClickEvent('confirm', false)">确定</div>
		</div>
		<div
			v-for="(item, index) in carKeyboardData()"
			:key="index"
			class="gy-keyboard-item"
			:style="{
				'grid-template-columns':
					index == 3 ? `1fr repeat(${item.length}, max-content) 1fr` : `repeat(${item.length}, 1fr)`,
			}"
		>
			<div
				v-if="index == 3"
				class="gy-keyboard-item-content switch-mode"
				:style="{
					filter: `opacity(${isSwitch ? 0.5 : 1})`,
				}"
				@click="switchKeyboard"
			>
				{{ keyboardToggle == "province" ? "abc" : "返回" }}
			</div>
			<div
				v-for="(sub_item, sub_index) in item"
				:key="sub_index"
				class="gy-keyboard-item-content"
				:style="{
					filter: `opacity(${sub_item.disabled ? 0.5 : 1})`,
				}"
				@click="keyboardClickEvent(sub_item.value, sub_item.disabled)"
			>
				{{ sub_item.value }}
			</div>
			<div v-if="index == 3" class="gy-keyboard-item-content delete" @click="backspaceEvent">
				<GyIcon name="i-majesticons-backspace" color="#252525" size="24" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.gy-keyboard {
	display: grid;
	position: absolute;
	z-index: 99999999;
	bottom: 0;
	left: 0;
	grid-template-rows: repeat(4, max-content);
	width: calc(100% - 32px);
	padding: 16px 16px 24px;
	border-top: 0.5px solid #66666629;
	border-radius: 16px 16px 0 0;
	background-color: #fff;
	pointer-events: auto;
	gap: 8px;

	.car-no {
		display: grid;
		grid-template-columns: max-content 1fr;
		align-items: center;
		width: 100%;
		height: 40px;

		&-item {
			display: flex;
			align-items: center;
			justify-content: center;
			color: #191919;
			font-size: 24px;
			font-weight: 900;
			letter-spacing: 1px;
		}
	}

	&-item {
		display: grid;
		align-items: center;
		justify-content: space-between;
		gap: 4px;

		&-content {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 30px;
			height: 45px;
			transition: all 0.1s;
			border-radius: 4px;
			background-color: #d1d6e4;
			color: #252525;
			font-size: 16px;
			font-weight: 600;

			&:active {
				background-color: #586c9d;
				color: #fff;
			}
		}

		.delete,
		.switch-mode {
			width: 100%;
		}
	}

	.operation {
		display: grid;
		grid-template-columns: 1fr max-content max-content;
		justify-content: space-between;
		gap: 8px;

		&-stow,
		&-confirm,
		&-reset {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 8px 16px;
			transition: all 0.1s;
			border-radius: 6px;
			font-size: 14px;
			font-weight: 600;
		}

		&-stow {
			width: fit-content;
			padding: 8px;
			background-color: #b1b1b140;
			color: #666;

			&:active {
				background-color: #66666640;
			}
		}

		&-reset {
			background-color: #b1b1b140;
			color: #666;

			&:active {
				background-color: #66666640;
			}
		}

		&-confirm {
			background-color: #3eb3af40;
			color: #328efe;

			&:active {
				background-color: #3eb3af80;
			}
		}
	}
}
</style>
.
