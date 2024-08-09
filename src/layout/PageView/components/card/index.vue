<script lang="ts" setup>
const { item, current, index, total } = defineProps<{
	item: any;
	current: boolean;
	index: number;
	total: number;
}>();

const onClick = () => {
	if (getCurrentPages().length == 1) {
		uni.showToast({
			icon: "error",
		});
	} else {
		uni.navigateBack({
			delta: getCurrentPages().length - 1 - index,
		});
	}
};
</script>

<template>
	<div
		class="card"
		:class="{
			'card-active': current,
		}"
		@click="onClick"
	>
		<div class="w-6em hide">{{ item?.title }}</div>
		<GyIcon name="i-ep-arrow-right-bold" :color="current ? '#fff' : '#328EFE'" size="15" />
	</div>
</template>

<style scoped lang="less">
.card {
	display: grid;
	grid-template-columns: 1fr max-content;
	align-items: center;
	justify-content: space-between;
	padding: 6px 6px 6px 12px;
	border-radius: 8px;
	background-color: #ecf7f7;
	color: #328efe;
	font-size: 12px;
	font-weight: 600;

	&-active {
		background-color: #328efe;
		color: #fff;
	}
}
</style>
