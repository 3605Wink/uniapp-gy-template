<script lang="ts" setup>
const {
	modelValue,
	title,
	titleColor = "#191919",
	close = true,
	closeColor = "#666666",
	height = 400,
	closeOnClickOverlay = false,
} = defineProps<{
	modelValue: boolean;
	title?: string;
	titleColor?: string;
	close?: boolean;
	closeOnClickOverlay?: boolean;
	closeColor?: string;
	height?: number;
}>();
const emits = defineEmits(["update:modelValue"]);
let show = $ref(false);
let overlayShow = $ref(false);
let itemShow = $ref(false);
let popupStyle = reactive({
	"height": "calc(100% - 64rpx)",
	"padding": "32rpx",
	"border-radius": "48rpx",
	"background-color": "#fff",
	"position": "absolute",
	"width": "calc(100% - 128rpx)",
	"zIndex": 9999,
	"left": "32rpx",
	"bottom": "32rpx",
});
watch(
	() => modelValue,
	newValue => {
		overlayShow = newValue;
	}
);

const onComplete = () => {
	show = false;
	overlayShow = false;
	itemShow = false;
	emits("update:modelValue", false);
};
const onClose = () => {
	if (closeOnClickOverlay) onComplete();
};
</script>

<template>
	<!-- <div class="popup"> -->
	<GyOverlay
		v-model:show="overlayShow" opacity="0.15" @start="show = true" @complete="onComplete"
		@close="onClose"
	/>
	<GyTransition :show="show" name="slide-left" :customStyle="popupStyle" @on-start="itemShow = true">
		<template v-if="close">
			<slot name="title">
				<div class="popup-close" @click="onComplete">
					<GyIcon name="i-mingcute-close-fill" size="18" :color="closeColor" />
				</div>
			</slot>
		</template>
		<template v-if="close">
			<slot name="close">
				<div class="popup-title" :style="{ color: titleColor }">
					{{ title }}
				</div>
			</slot>
		</template>
		<div
			class="popup-item" :style="{
				paddingTop: title == undefined ? '16px' : '0',

			}"
		>
			<GyTransition
				:show="itemShow" :customStyle="{
					height: '100%',
				}"
			>
				<slot />
			</GyTransition>
		</div>
	</GyTransition>
	<!-- </div> -->
</template>

<style scoped lang="less">
.popup {
	&-item {
		height: calc(100% - 16px);
		overflow: scroll;
	}

	&-title {
		position: sticky;
		z-index: 1;
		top: 0;
		padding-bottom: 16px;
		font-size: 16px;
		font-weight: 600;
		line-height: 16px;
		text-align: center;
	}

	&-close {
		position: absolute;
		z-index: 2;
		top: 16px;
		right: 16px;
	}
}
</style>
