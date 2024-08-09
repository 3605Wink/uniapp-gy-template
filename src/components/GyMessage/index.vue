<!-- eslint-disable dot-notation -->
<script setup lang="ts">
import gsap from "gsap";

interface messagesType {
	content: string;
	type: "success" | "warning" | "info" | "error";
}

const messageParams = reactive<messagesType>({
	type: "success",
	content: "",
});
const colors = {
	success: {
		color: "#67C23A",
		background: "#f0f9eb",
		icon: "i-ep-circle-check-filled",
	},
	info: {
		color: "#909399",
		background: "#f4f4f5",
		icon: "i-ep-info-filled",
	},
	warning: {
		color: "#E6A23C",
		background: "#fdf6ec",
		icon: "i-ep-warning-filled",
	},
	error: {
		color: "#F56C6C",
		background: "#fef0f0",
		icon: "i-ep-circle-close-filled",
	},
};
const animationParams = reactive({
	transform: "translate3d(100%,0,0) ",
	opacity: 1,
});

let messageWidth = $ref(0);
let iconWidth = $ref(0);

onMounted(async () => {
	const info = await useRectMult([".gy-message", ".gy-message-icon"]);
	messageWidth = info[0].width!;
	iconWidth = info[1].width!;
});

let hidden = $ref(false);
let icon = $ref("i-svg-spinners-pulse-2");
let iconColor = $ref("#666");
let isExecuting = $ref(false);
const open = async (params: messagesType) => {
	if (isExecuting) return;

	isExecuting = true;
	merge(messageParams, params);
	icon = colors[params?.type].icon;
	iconColor = colors[params?.type].color;
	// uni.vibrateShort();

	gsap.to(animationParams!, {
		transform: `translate3d(-${(16 / messageWidth) * 100}%,0,0) `,
		opacity: 1,
		duration: 0.3,
		ease: "expoScale(0.5,7,power1.in)",
		onComplete() {
			setTimeout(() => {
				gsap.to(animationParams!, {
					transform: "translate3d(100%,0,0) ",
					opacity: 1,
					duration: 0.2,
					ease: "power3.out",
					onComplete() {
						icon = "i-svg-spinners-pulse-2";
						iconColor = "#666";
						isExecuting = false;
					},
				});
			}, 3000);
		},
	});
};

defineExpose({ open });

const top = computed(() => {
	const { top, height } = uni.getMenuButtonBoundingClientRect();
	return top + height + 10;
});
</script>

<template>
	<div
		class="gy-message"
		:style="{
			...filterObject(animationParams),
			top: `${top}px`,
		}"
	>
		<div class="gy-message-icon">
			<GyIcon :name="icon" size="24" :color="iconColor" />
		</div>
		<div class="gy-message-title">
			{{ messageParams.content }}
		</div>
	</div>
</template>

<style scoped lang="less">
.gy-message {
	display: grid;
	position: fixed;
	z-index: 999999999999;
	right: 0;
	grid-template-columns: max-content 1fr;
	align-items: flex-start;
	min-width: 150px;
	max-width: 200px;
	padding: 16px;
	gap: 8px;
	border-radius: 18px;
	background-color: #fff;
	box-shadow: rgb(0 0 0 / 11%) 0 1px 8px 1px;

	&-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&-title {
		width: 100%;
		color: #000;
		font-size: 14px;
		font-weight: 600;
		line-height: 24px;
	}
}
</style>
