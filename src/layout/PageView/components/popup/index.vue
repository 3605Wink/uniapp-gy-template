<script lang="ts" setup>
const {
	modelValue,
	titleColor = "#191919",
	close = true,
	closeColor = "#666666",
	height,
	closeOnClickOverlay = true,
} = defineProps<{
	modelValue: boolean;
	titleColor?: string;
	close?: boolean;
	closeOnClickOverlay?: boolean;
	closeColor?: string;
	height?: string;
}>();
const emits = defineEmits(["update:modelValue"]);
let show = $ref(false);
let overlayShow = $ref(false);
let itemShow = $ref(false);
let popupStyle = reactive({
	height,
	"padding": "32rpx",
	"border-radius": "48rpx",
	"background-color": "#fff",
	"position": "absolute",
	"width": "200rpx",
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
	<GyOverlay v-model:show="overlayShow" opacity="0.15" @start="show = true" @complete="onComplete" @close="onClose" />
	<GyTransition :show="show" name="slide-left" :customStyle="popupStyle" @on-start="itemShow = true">
		<div class="popup-item">
			<GyTransition
				:show="itemShow"
				:customStyle="{
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
		height: 100%;
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
