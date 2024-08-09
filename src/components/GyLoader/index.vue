<script lang="ts" setup>
import gsap from "gsap";

const {
	show,
	zIndex = 999999,
	background = "#ffffffbd",
	duration = 0.2,
	iconColor,
} = defineProps<{
	zIndex?: number;
	background?: string;
	duration?: number;
	show: boolean;
	iconColor?: string;
}>();

let hidden = $ref(false);
let popupStyle = reactive<Record<any, any>>({
	opacity: 0,
	transform: "translate(-50%,-40%) scale(1.3, 1.3)",
});

watch(
	() => show,
	() => {
		if (show) {
			gsap.to(popupStyle!, {
				duration: 0.3,
				opacity: 1,
				transform: "translate(-50%,-50%) scale(1, 1)",
				ease: "power1.out",
				onStart() {
					hidden = true;
				},
			});
		} else {
			gsap.to(popupStyle!, {
				opacity: 0,
				transform: "translate(-50%,-40%) scale(1.3, 1.3)",
				duration: 0.3,
				ease: "power1.out",
				onComplete() {
					hidden = false;
				},
			});
		}
	}
);
</script>

<template>
	<div v-show="hidden" class="gy-loader" :style="{ zIndex: zIndex + 1 }">
		<div class="loader" :style="{ ...filterObject(popupStyle), background, zIndex: zIndex + 2 }">
			<div class="three-body">
				<div class="three-body__dot" />
				<div class="three-body__dot" />
				<div class="three-body__dot" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.gy-loader {
	@keyframes spinner-e04l1k {
		100% {
			transform: rotate(1turn);
		}
	}

	@keyframes spin78236 {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes wobble1 {
		0%,
		100% {
			transform: translateY(0%) scale(1);
			opacity: 1;
		}

		50% {
			transform: translateY(-66%) scale(0.65);
			opacity: 0.8;
		}
	}

	@keyframes wobble2 {
		0%,
		100% {
			transform: translateY(0%) scale(1);
			opacity: 1;
		}

		50% {
			transform: translateY(66%) scale(0.65);
			opacity: 0.8;
		}
	}

	position: fixed;
	z-index: 9999999;
	top: 0;
	left: 0;
	box-sizing: border-box;
	width: 100%;
	height: 100vh;
	-webkit-overflow-scrolling: touch;

	.loader {
		display: flex;
		position: fixed;
		top: 50%;
		left: 50%;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		width: 80px;
		height: 80px;
		border-radius: 16px;
		backdrop-filter: blur(2px);
	}

	.three-body {
		--uib-size: 35px;
		--uib-speed: 0.8s;
		--uib-color: #328efe;

		display: inline-block;
		position: relative;
		width: var(--uib-size);
		height: var(--uib-size);
		animation: spin78236 calc(var(--uib-speed) * 2.5) infinite linear;
	}

	.three-body__dot {
		position: absolute;
		width: 30%;
		height: 100%;
	}

	.three-body__dot::after {
		content: "";
		position: absolute;
		width: 100%;
		height: 0%;
		padding-bottom: 100%;
		border-radius: 50%;
		background-color: var(--uib-color);
	}

	.three-body__dot:nth-child(1) {
		bottom: 5%;
		left: 0;
		transform: rotate(60deg);
		transform-origin: 50% 85%;
	}

	.three-body__dot:nth-child(1)::after {
		bottom: 0;
		left: 0;
		animation: wobble1 var(--uib-speed) infinite ease-in-out;
		animation-delay: calc(var(--uib-speed) * -0.3);
	}

	.three-body__dot:nth-child(2) {
		right: 0;
		bottom: 5%;
		transform: rotate(-60deg);
		transform-origin: 50% 85%;
	}

	.three-body__dot:nth-child(2)::after {
		bottom: 0;
		left: 0;
		animation: wobble1 var(--uib-speed) infinite calc(var(--uib-speed) * -0.15) ease-in-out;
	}

	.three-body__dot:nth-child(3) {
		bottom: -5%;
		left: 0;
		transform: translateX(116.666%);
	}

	.three-body__dot:nth-child(3)::after {
		top: 0;
		left: 0;
		animation: wobble2 var(--uib-speed) infinite ease-in-out;
	}
}
</style>
