<script lang="ts" setup>
import { debounce } from "@wsvaio/utils";

const {
	checked,
	bgColor = "#387efe",
	size = 18,
	color = "#ddd",
} = defineProps<{
	checked: boolean;
	bgColor?: string;
	size?: number;
	color?: string;
}>();
const emits = defineEmits(["update:checked", "change"]);

const change = debounce(() => {
	let isChecked = !checked;
	emits("update:checked", isChecked);
	emits("change", isChecked);
}, 100);
</script>

<template>
	<div
		class="container"
		:style="{
			'--bg-color': bgColor,
			'--size': `${size}px`,
			'backgroundColor': color,
		}"
		@click="change"
	>
		<div class="checkmark" :class="{ checked }">
			<GyIcon v-show="checked" name="i-ph-check-bold" :size="size * 0.618" color="#ffffff" bold />
		</div>
	</div>
</template>

<style scoped lang="less">
.container {
	display: inline-block;
	display: flex;
	position: relative;
	align-items: center;
	transform: scale(0.9);
	transition: all 0.3s;
	border-radius: 50%;
	font-size: 14px;
	cursor: pointer;
	user-select: none;
	-webkit-tap-highlight-color: rgb(0 0 0 / 0%);
	-webkit-overflow-scrolling: touch;

	.checkmark {
		display: flex;
		position: relative;
		top: 0;
		left: 0;
		align-items: center;
		justify-content: center;
		width: var(--size);
		height: var(--size);
		transition: 300ms;
		border-radius: 50%;
	}

	.checked {
		animation: pulse 500ms ease-in-out;
		border-radius: 50%;
		background: var(--bg-color);
	}
}

@keyframes pulse {
	0% {
		box-shadow: 0 0 0 #346cff90;
		rotate: 20deg;
	}

	50% {
		rotate: -20deg;
	}

	100% {
		rotate: 0;
	}
}
</style>
