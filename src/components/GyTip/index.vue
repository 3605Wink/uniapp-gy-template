<script setup lang="ts">
import gsap from "gsap";

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
let contentWidth = $ref(0);
let iconWidth = $ref(0);
// 需要显示的内容
let content = $ref("");

onMounted(async () => {
	const info = await useRectMult([".gy-tip", ".gy-tip-icon"]);
	contentWidth = info[0].width!;
	iconWidth = info[1].width!;
});

let icon = $ref("i-svg-spinners-pulse-2");
let iconColor = $ref("#666");
let isExecuting = $ref(false);

const ready = async <T>(func: () => Promise<T>, callback: (res: T, open: typeof openTip) => void) => {
	if (isExecuting) return;
	isExecuting = true;
	gsap.to(animationParams!, {
		transform: `translate3d(${(1 - iconWidth / contentWidth) * 100}%,0,0)`,
		opacity: 1,
		duration: 0.5,
		ease: "expoScale(0.5,7,power1.inOut)",
		onComplete: () => {
			try {
				if (func) {
					const handleAction = async () => {
						const result = await new Promise<T>(resolve => {
							func()
								.then(res => resolve(res))
								.catch(err => resolve(err));
						});
						if (callback) {
							callback?.(result, openTip);
						}
					};
					handleAction();
				}
			} catch (err) {
				callback?.(err as any, openTip);
			}
		},
	});
};

const openTip = (type: "success" | "warning" | "info" | "error", message: string) => {
	gsap.to(animationParams!, {
		transform: `translate3d(-${(16 / contentWidth) * 100}%,0,0) `,
		opacity: 1,
		duration: 0.3,
		ease: "expoScale(0.5,7,power1.in)",
		onStart() {
			content = message;
			icon = colors[type].icon;
			iconColor = colors[type].color;
		},
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
						content = "";
					},
				});
			}, 3000);
		},
	});
};

const top = computed(() => {
	let { windowHeight, screenHeight } = uni.getSystemInfoSync();

	if (windowHeight == screenHeight) {
		const { top, height } = uni.getMenuButtonBoundingClientRect();
		return top + height + 10;
	} else {
		return 10;
	}
});
defineExpose({ ready });
</script>

<template>
	<div
		class="gy-tip"
		:style="{
			...filterObject(animationParams),
			top: `${top}px`,
		}"
	>
		<div class="gy-tip-icon">
			<GyIcon :name="icon" size="24" :color="iconColor" />
		</div>
		<div class="gy-tip-title">
			{{ content }}
		</div>
	</div>
</template>

<style scoped lang="less">
.gy-tip {
	display: grid;
	position: fixed;
	z-index: 9999999;
	right: 0;
	grid-template-columns: max-content 1fr;
	align-items: flex-start;
	min-width: 150px;
	max-width: 200px;
	border-radius: 18px;
	background-color: #fff;
	box-shadow: rgb(0 0 0 / 11%) 0 1px 8px 1px;

	&-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
	}

	&-title {
		display: flex;
		align-items: center;
		width: calc(100% - 16px);
		padding: 16px 16px 16px 0;
		color: #191919;
		font-size: 14px;
		font-weight: 600;
		line-height: 24px;
	}
}
</style>
