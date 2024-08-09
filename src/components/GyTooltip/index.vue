<script lang="ts" setup>
import gsap from "gsap";

const {
	show,
	location = "left",
	offset = [8, 0],
} = defineProps<{
	show: boolean;
	location?: "top" | "bottom" | "left" | "right";
	offset?: number[];
}>();

const emits = defineEmits(["update:show"]);

const style = reactive({
	opacity: 0,
	top: 0,
	left: 0,
});
let hidden = $ref(false);
let locationType = $ref<"top" | "bottom" | "left" | "right">();

onMounted(async () => {
	// const rect = await useRectMult([".tooltip-trigger", ".tooltip-content"]);
	// // if (location == "top" || location == "bottom") {
	// // 	if (rect[0].top! + offset[0] < rect[1].height!) locationType = "bottom";
	// // 	else locationType = "top";
	// // } else {
	// // 	console.log("123123");
	// // 	console.log(rect[0].left! + offset[1], rect[1].width);
	// // 	if (rect[0].left! + offset[1] < rect[1].width!) locationType = "right";
	// // 	else locationType = "left";
	// // }
	switch (locationType || location) {
		case "top":
			merge(style, {
				// top: `${rect[0]?.top! + offset[0]}px`,
				// left: `${rect[0]?.left! + rect[0]?.width! / 2}px`,
				top: "calc(100% + 8px)",
				left: "50%",
				transform: "translate3d(-50%,100%,0px) scale3d(0,0,0)",
			});
			break;
		case "bottom":
			merge(style, {
				top: "calc(100% + 8px)",
				left: "50%",
				transform: "translate3d(-50%,-100%,0px) scale3d(0,0,0)",
			});
			break;
			// case "left":
			// 	merge(style, {
			// 		top: `${rect[0]?.top! + rect[0]?.height! / 2}px`,
			// 		left: `${rect[0]?.left! - rect[1]?.width! - offset[1]}px`,
			// 		transform: "translate3d(50%,-50%,0px) scale3d(0,0,0)",
			// 	});
			// 	break;
			// case "right":
			// 	merge(style, {
			// 		top: `${rect[0]?.top! + rect[0]?.height! / 2}px`,
			// 		left: `${rect[0]?.left! + rect[0]?.width! + offset[1]}px`,
			// 		transform: "translate3d(-50%,-50%,0px) scale3d(0,0,0)",
			// 	});
			break;
	}
});

const onClick = () => {
	if (!show) {
		if (["top", "bottom"].includes(locationType || location)) {
			gsap.to(style, {
				opacity: 1,
				duration: 0.3,
				transform: "translate3d(-50%,0%,0px) scale3d(1,1,1)",
			});
		} else {
			gsap.to(style, {
				opacity: 1,
				duration: 0.3,
				transform: "translate3d(0%,-50%,0px) scale3d(1,1,1)",
			});
		}
	} else {
		if (["top", "bottom"].includes(locationType || location)) {
			gsap.to(style, {
				opacity: 0,
				duration: 0.3,
				transform:
					(locationType || location) == "bottom"
						? "translate3d(-50%,-100%,0px) scale3d(0,0,0)"
						: "translate3d(-50%,100%,0px) scale3d(0,0,0)",
			});
		} else {
			gsap.to(style, {
				opacity: 1,
				duration: 0.3,
				transform:
					(locationType || location) == "right"
						? "translate3d(-50%,-50%,0px) scale3d(0,0,0)"
						: "translate3d(50%,-50%,0px) scale3d(0,0,0)",
			});
		}
	}

	emits("update:show", !show);
};
</script>

<script lang="ts">
export default {
	options: {
		virtualHost: true,
	},
};
</script>

<template>
	<div class="tooltip" @click.stop="onClick">
		<div class="tooltip-trigger">
			<slot name="trigger" />
		</div>

		<div class="tooltip-content" :style="style">
			<slot name="content" />
			<div class="tooltip-content-triangle" :class="[`tooltip-content-triangle-${location}`]" />
		</div>
	</div>
</template>

<style scoped lang="less">
.tooltip {
	position: relative;
	display: flex;
	align-items: center;

	&-trigger {
		display: inline-block;
	}

	&-content {
		display: inline-block;
		position: absolute;
		border-radius: 8px;
		background-color: #fff;
		box-shadow: 0 0 10px 4px #00000010;
		word-break: normal;

		&-triangle {
			position: absolute;
			width: 0;
			height: 0;
			box-shadow: 0 -8px 12px 0 #00000010;

			&-bottom {
				top: -20%;
				left: 50%;
				transform: translate(-50%);
				border-right: 6px solid transparent;
				border-bottom: 10px solid #fff;
				border-left: 6px solid transparent;
			}

			&-top {
				bottom: -20%;
				left: 50%;
				transform: translate(-50%);
				border-top: 10px solid #fff;
				border-right: 6px solid transparent;
				border-left: 6px solid transparent;
			}

			&-left {
				top: 50%;
				right: -8px;
				transform: translate(0, -50%);
				border-top: 6px solid transparent;
				border-bottom: 6px solid transparent;
				border-left: 10px solid #fff;
			}

			&-right {
				top: 50%;
				left: -8px;
				transform: translate(0, -50%);
				border-top: 6px solid transparent;
				border-right: 10px solid #fff;
				border-bottom: 6px solid transparent;
			}
		}
	}
}
</style>
