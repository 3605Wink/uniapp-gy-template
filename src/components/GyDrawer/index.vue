<script lang="ts" setup>
const {
	show,
	position = "center",
	zIndex = 10,
	background = "#ffffff",
	duration = 0.2,
	height = 400,
	round = false,
	closeOnClickOverlay = true,
	closeIcon = false,
	iconLocation = "top-right",
	isPadding = true,
	iconColor,
	customStyle = {},
} = defineProps<{
	position?: positionType;
	zIndex?: number;
	background?: string;
	duration?: number;
	show: boolean;
	height?: number;
	round?: boolean;
	closeOnClickOverlay?: boolean;
	closeIcon?: boolean;
	iconLocation?: iconPositionType;
	isPadding?: boolean;
	iconColor?: string;
	customStyle?: Record<any, any>;
}>();
const emits = defineEmits(["update:show", "clickOverlay"]);

let hidden = $ref<boolean>(false);

const name = $computed(
	():
		| "fade"
		| "slide-right"
		| "slide-left"
		| "slide-up"
		| "fade-up"
		| "fade-down"
		| "fade-left"
		| "fade-right"
		| "slide-down"
		| "zoom" => {
		switch (position) {
			case "center":
				return "zoom";
			case "left":
				return "slide-right";
			case "right":
				return "slide-left";
			case "top":
				return "fade-down";
			case "bottom":
				return "slide-up";
		}
	}
);
const popupStyles = {
	center: {
		animation: "zoom",
		style: {
			top: "50%",
			right: "0",
			left: "50%",
			width: "fit-content",
			maxWidth: "calc(100vw - 32px)",
			margin: "0 auto",
			overflow: "hidden",
			transform: " translate(-50%,-50%)",
			borderRadius: "12px",
		},
	},
	top: {
		animation: "slide-down",
		style: {
			top: "0",
			left: "0",
			width: "100%",
			borderRadius: "0 0 16px 16px",
		},
	},
	bottom: {
		animation: "slide-up",
		style: {
			bottom: "0",
			left: "0",
			width: "100%",
			borderRadius: "16px 16px 0 0",
		},
	},
	left: {
		animation: "slide-right",
		style: {
			top: "0",
			left: "0",
			height: "100%",
			borderRadius: "16px 0 0 16px",
		},
	},
	right: {
		animation: "slide-left",
		style: {
			top: "0",
			right: "0",
			height: "100%",
			borderRadius: "0 16px 16px 0",
		},
	},
};
const clickOverlay = () => {
	if (closeOnClickOverlay) emits("update:show", false);
	emits("clickOverlay");
};
const clickIcon = () => {
	if (closeIcon) emits("update:show", false);
};
const color = $computed(() => {
	return iconColor || isLightColor(background).dominantColor;
});
</script>

<template>
	<div class="gy-popup" :style="{ zIndex: zIndex + 1 }">
		<gy-overlay
			:show="show"
			opacity="0.35"
			:z-index="zIndex + 2"
			@close="clickOverlay"
			@start="hidden = true"
			@complete="hidden = false"
		/>
		<gyTransition
			:show="hidden"
			:name="name"
			:duration="position == 'top' ? 200 : 300"
			:custom-style="{
				'zIndex': zIndex + 3,
				'width': position == 'center' ? 'auto' : '100%',
				'position': 'fixed',
				'box-sizing': ' border-box',
				'max-height': '100%',
				'overflow-y': 'auto',
				'-webkit-overflow-scrolling': 'touch',
				...popupStyles[position].style,
			}"
		>
			<div
				class="popup"
				:class="[`popup--${position}`]"
				:style="{
					background,
					padding: isPadding ? '16px' : '0',
					width: isPadding ? 'calc(100% - 32px)' : '100%',
				}"
			>
				<div
					v-if="closeIcon"
					:class="[`popup--close--${iconLocation}`]"
					:style="{ zIndex: zIndex + 3 }"
					class="absolute"
					@click="clickIcon"
				>
					<GyIcon name="i-mingcute-close-fill" size="20" :color="color" />
				</div>

				<slot />
			</div>
		</gyTransition>
	</div>
</template>

<style scoped lang="less">
//
.gy-popup {
	position: fixed;
	box-sizing: border-box;
	max-height: 100%;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;

	.popup {
		.popup--close {
			position: absolute;

			&--top-left {
				top: 16px;
				left: 16px;
			}

			&--top-right {
				top: 16px;
				right: 16px;
			}

			&--bottom-left {
				bottom: 16px;
				left: 16px;
			}

			&--bottom-right {
				right: 16px;
				bottom: 16px;
			}
		}

		&--center {
			top: 50%;
			right: 0;
			left: 50%;
			width: fit-content;
			max-width: calc(100vw - 32px);
			margin: 0 auto;
			padding: 16px;
			overflow: hidden;

			&.popup--round {
				border-radius: 8px;
			}
		}

		&--top {
			top: 0;
			left: 0;
			width: 100%;

			&.popup--round {
				border-radius: 0 0 16px 16px;
			}
		}

		&--bottom {
			bottom: 0;
			left: 0;
			width: 100%;

			&.popup--round {
				border-radius: 16px 16px 0 0;
			}
		}

		&--left {
			top: 0;
			left: 0;
			height: 100%;

			&.popup--round {
				border-radius: 16px 0 0 16px;
			}
		}

		&--right {
			top: 0;
			right: 0;
			height: 100%;

			&.popup--round {
				border-radius: 0 16px 16px 0;
			}
		}
	}
}
</style>
