<script lang="ts" setup>
const {
	background = "#e04949",
	slideIcon = "i-ph-paper-plane-right-bold",
	prompt = "",
	iconColor = "#fff",
	iconSize = 24,
	width = "100%",
	size = 45,
} = defineProps<{
	background?: string;
	slideIcon?: string;
	prompt?: string;
	iconColor?: string;
	iconSize?: number;
	size?: number;
	width?: number | string;
}>();
const emit = defineEmits(["success"]);
let rect = $ref<UniApp.NodeInfo>();
const instance = getCurrentInstance();
onMounted(async () => {
	rect = await useRect(".gy-slide", instance!);
});

let scrollX = $ref<number>(0);
let x = $ref(0);
const onChange = (e: { detail: { x: number } }) => {
	scrollX = e.detail.x;
};

// 滑动结束 验证是否解锁
const onTouchend = () => {
	x = scrollX;
	console.log(Math.round(scrollX), Math.round(rect?.width! * 0.8));

	if (Math.round(scrollX) < Math.round(rect?.width! * 0.7)) {
		setTimeout(() => {
			x = 0;
			scrollX = 0;
		}, 100);
	} else {
		emit("success");
	}
};

// 恢复滑动距离
const reset = () => {
	x = 0;
};

defineExpose({ reset });
</script>

<template>
	<div class="slide">
		<movable-area class="gy-slide">
			<div class="prompt">滑动结束充电</div>
			<movable-view
				direction="horizontal"
				inertia
				class="gy-slide--item"
				:x="x"
				@change="onChange"
				@touchend="onTouchend"
			>
				<GyIcon name="i-material-symbols-keyboard-double-arrow-right-rounded" :color="iconColor" :size="iconSize" />
			</movable-view>
		</movable-area>
	</div>
</template>

<style scoped lang="less">
.slide {
	padding: 6px;
	border-radius: 12px;
	border: 2px solid #ed4b47;
}

.gy-slide {
	position: relative;
	width: 100%;
	height: 40px;
	overflow: hidden;
	border-radius: 8px;
	background-color: #ffffff00;

	&--item {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
		width: 75px;
		height: 40px;
		border-radius: 8px;
		background: linear-gradient(
			162deg,
			#e67c4f -42%,
			#e6744d -20%,
			#e56c4b 0%,
			#e4644a 21%,
			#e35b4a 42%,
			#e2524a 64%,
			#e1484a 85%,
			#df3d4b 106%
		);
	}

	.prompt {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #f84554;
		font-size: 16px;
		font-weight: 500;
	}
}
</style>
