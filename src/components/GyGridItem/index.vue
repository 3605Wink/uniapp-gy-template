<!-- eslint-disable vue/valid-attribute-name -->
<script lang="ts" setup>
const {
	icon = "i-line-md-coffee-loop",
	title,
	disabled = false,
	color,
	fontSize = 12,
	isButton = false,
} = defineProps<{
	icon?: string;
	title: string | number;
	disabled?: boolean;
	iconSize?: number;
	color?: string;
	fontSize?: number;
	isButton?: boolean;
}>();

const emits = defineEmits(["open"]);
const options: {
	size: number;
	color: string;
	cols: number;
	padding?: string;
} = inject("gridItem") as any;
const itemStyle = $computed(() => {
	if (disabled) {
		return {
			flexBasis: `${100 / options.cols}%`,
			filter: "invert(1)",
		};
	} else {
		return {
			flexBasis: `${100 / options.cols}%`,
		};
	}
});
const open = () => {
	if (disabled) return;
	emits("open");
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
	<div class="gy-grid-item" :style="itemStyle" @click="open">
		<div
			v-if="!isButton"
			class="gy-grid-item-content"
			:style="{
				padding: options.padding,
			}"
		>
			<GyIcon :name="icon" :size="options.size" :color="color || options.color" />
			<div
				class="gy-grid-item--title"
				:style="{
					color: color || options.color,
					fontSize: `${fontSize}px`,
				}"
			>
				{{ title }}
			</div>
		</div>
		<button
			v-else
			open-type="contact"
			class="gy-grid-item-content"
			:style="{
				padding: options.padding,
			}"
		>
			<GyIcon :name="icon" :size="options.size" :color="color || options.color" />
			<div
				class="gy-grid-item--title"
				:style="{
					color: color || options.color,
					fontSize: `${fontSize}px`,
				}"
			>
				{{ title }}
			</div>
		</button>
	</div>
</template>

<style scoped lang="less">
.gy-grid-item {
	position: relative;
	box-sizing: border-box;
	height: 100%;

	&-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 16px 8px;
		border-style: none;
		background: #fff0;
	}

	&--title {
		margin-top: 4px;
		color: #191919;
		font-size: 12px;
		font-weight: 600;
		line-height: 18px;
	}

	&:active {
		filter: contrast(70%);
	}
}
</style>
