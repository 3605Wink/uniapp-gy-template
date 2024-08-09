<script lang='ts' setup>
const {
	title,
	size = 16,
	color = "#191919",
	fontWeight = 600,
	lineHeight = 24,
	isLine = false,
	lineWidth = 6,
	lineColor = "linear-gradient(45deg, rgb(0 144 255 / 100%) 0%, rgb(186 255 240 / 100%) 100%)",
	lineCap = "circle",
	lineRight = 6,
	descr = "",
	descrSize = 12,
	descrColor = "#B2B2B2",
} = defineProps<{
	title: string;
	size?: number;
	color?: string;
	fontWeight?: number;
	lineHeight?: number | string;
	isLine?: boolean;
	lineWidth?: number | string;
	lineColor?: string;
	lineCap?: "circle" | "square";
	lineRight?: number | string;
	descr?: string;
	descrSize?: number;
	descrColor?: string;
}>();
</script>

<template>
	<div class="gy-section">
		<div
			v-if="isLine" class="gy-section--decoration" :class="[`gy-section--decoration--${lineCap}`]" :style="{
				'--line-width': `${Number(lineWidth) * 2}rpx`,
				'--line-height': `${(size + 2) * 2}rpx`,
				'--line-bg-color': lineColor,
				'--line-right': `${Number(lineRight) * 2}rpx`,
			}"
		/>
		<div
			class="gy-section--title" :style="{
				'--title-font-size': `${size * 2}rpx`,
				'--title-text-color': color,
				'--title-font-weight': fontWeight,
				'--title-line-height': `${Number(lineHeight) * 2}rpx`,
			}"
		>
			{{ title }}
		</div>
		<div
			v-if="descr.length !== 0" class="gy-section--describe" :style="{
				'--descr-font-size': `${descrSize * 2}rpx`,
				'--descr-text-color': descrColor,
			}"
		>
			{{ descr }}
		</div>
	</div>
</template>

<style scoped lang='less'>
.gy-section {
	display: grid;
	grid-template-columns: max-content 1fr;
	grid-template-rows: max-content max-content;
	align-content: center;
	align-items: center;

	&--decoration {
		grid-column: span 1;
		grid-row: span 1;
		width: var(--line-width);
		height: var(--line-height);
		margin-right: var(--line-right);
		background: var(--line-bg-color);

		&--square {
			border-radius: 1px;
		}

		&--circle {
			border-radius: 8px;
		}
	}

	&--title {
		grid-column: span 1;
		grid-row: span 1;
		color: var(--title-text-color);
		font-size: var(--title-font-size);
		font-weight: var(--title-font-weight);
		line-height: var(--title-line-height)
	}

	&--describe {
		grid-column: span 2;
		grid-row: span 1;
		padding-top: 4px;
		color: var(--descr-text-color);
		font-size: var(--descr-font-size);
	}
}
</style>
