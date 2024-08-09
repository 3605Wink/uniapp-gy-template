<script lang="ts" setup>
const {
	cols = 3,
	gap = 0,
	size = 24,
	color = "#252525",
	padding = "0",
} = defineProps<{
	cols: number;
	gap?: number;
	size?: number;
	padding?: string;
	color?: string;
}>();

provide("gridItem", {
	cols,
	size,
	color,
	padding,
});
</script>

<template>
	<div
		class="gy-grid" :style="{
			gridTemplateColumns: `repeat(${cols},1fr)`,
		}"
	>
		<slot />
	</div>
</template>

<style scoped lang="less">
.gy-grid {
	display: grid;
	gap: 16px 8px;
}
</style>
