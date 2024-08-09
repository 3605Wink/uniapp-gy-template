<script lang="ts" setup>
interface valuesType {
	name: string;
	value: any;
}
const {
	height = 25,
	current = 0,
	values = [],
	bgColor = "#ffffff",
	activeBgColor = "#ffffff",
	activeTextColor,
	isPadding = true,
	round = false
} = defineProps<{
	current: number;
	values: valuesType[];
	activeColor?: string;
	height?: number;
	bgColor?: string;
	activeBgColor?: string;
	activeTextColor?: string;
	isPadding?: boolean;
	round?: boolean;
}>();
const emits = defineEmits(["update:current", "change"]);
let activeIndex = $ref(0);
onMounted(() => {
	activeIndex = current;
});

const gridCol = $computed(() => {
	return `repeat(${values.length},1fr)`;
});
const instance = getCurrentInstance();
let info = $ref<UniApp.NodeInfo>();
onMounted(async () => {
	info = await useRectInfo(".gy-sub-section-item", instance!);
});

const bgStyle = $computed(() => {
	return {
		height: `${height * 2}rpx`,
		width: `${info?.width!}px`,
		backgroundColor: activeBgColor,
		transform: `translateX(${activeIndex * 100}%)`,
		left: isPadding ? "4px" : 0,
		borderRadius: round ? "25px" : "0",
	};
});
const textStyle = $computed(() => {
	return index => {
		return {
			"color": activeIndex == index ? activeTextColor : "#191919",
			"line-height": `${height * 2}rpx`,
		};
	};
});
const change = (index: number) => {
	activeIndex = index;
	emits("update:current", index);
	emits("change", {
		index,
		value: values[index].value,
	});
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
	<div
		class="gy-sub-section"
		:style="{
			'grid-template-columns': gridCol,
			'height': `${height * 2}rpx`,
			'backgroundColor': `${bgColor}`,
			'padding': isPadding ? '4px' : '0',
			'borderRadius': round ? '25px' : '0',
		}"
	>
		<div v-for="(item, index) in values" :key="index" class="gy-sub-section-item" @click="change(index)">
			<div class="gy-sub-section-item-text" :style="textStyle(index)">{{ item.name }}</div>
		</div>
		<div class="gy-sub-section-item-bg" :style="bgStyle" />
	</div>
</template>
s

<style scoped lang="less">
.gy-sub-section {
	display: grid;
	position: relative;
	align-items: center;
	overflow: hidden;
	border-radius: 8px;

	&-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: calc(100% - 4px);
		height: 100%;
		padding: 0 2px;
		color: #303133;
		font-size: 10px;
		text-align: center;

		&-text {
			display: flex;
			position: relative;
			z-index: 3;
			flex-direction: row;
			align-items: center;
			transition: all 0.3s;
			color: #fff;
			font-size: 14px;
			font-weight: 700;
		}

		&-bg {
			position: absolute;
			transition: all 0.3s;
			border-radius: 8px;
		}
	}
}
</style>
