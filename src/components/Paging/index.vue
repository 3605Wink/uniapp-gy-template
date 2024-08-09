<script lang="ts" setup>
import loadPull from "./composables/index";

const {
	height,
	background = "#f5f6f7",
	refresherEnabled = true,
	scrollWithAnimation = true,
	refresherDefaultStyle = "none",
	func,
	modelValue,
	customStyle,
	notice = false,
	manual,
	method = "GET",
} = defineProps<{
	height?: number;
	background?: string;
	refresherEnabled?: boolean;
	scrollWithAnimation?: boolean;
	refresherDefaultStyle?: "black" | "white" | "none";
	func: (...args: any[]) => Promise<any>;
	modelValue?: any;
	customStyle?: any;
	notice?: boolean;
	manual?: boolean;
	method?: "POST" | "GET";
}>();

// 创建响应式对象来存储 loadPull 的结果
const {
	dropDownStatus,
	bottomLoadMore,
	dropDownRefresh,
	triggerPullDown,
	dataList,
	noMore,
	freeScroll,
	isFirstLoad,
	vHeight,
	run,
	refresh,
	scrollTop,
} = loadPull(
	async (...args) => {
		return await func(...args);
	},
	modelValue,
	{
		manual,
		method,
	}
);

watch(
	() => func,
	() => {
		run();
	}
);

defineExpose({
	run,
	refresh,
});
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
		class="paging"
		v-if="height || vHeight"
		:style="{
			height: `${height || vHeight}px`,
		}"
	>
		<template>
			<scroll-view
				:style="{
					'height': `${height || vHeight}px`,
					' flex-grow': 1,
				}"
				:enabled="true"
				scroll-y
				:scroll-top="scrollTop"
				:refresher-enabled="refresherEnabled"
				:refresher-default-style="refresherDefaultStyle"
				:scroll-anchoring="true"
				:scroll-with-animation="scrollWithAnimation"
				:refresher-background="background"
				:refresher-triggered="dropDownStatus"
				@refresherrefresh="dropDownRefresh"
				@refresherpulling="triggerPullDown"
				@scrolltolower="bottomLoadMore"
				@scroll="freeScroll"
			>
				<template #refresher>
					<div style="display: flex; justify-content: center; width: 100%">
						<slot name="refresher">
							<Loader />
						</slot>
					</div>
				</template>

				<div v-if="notice" style="height: 28px; margin-bottom: 12px">
					<slot name="header" :isFirstLoad="isFirstLoad"></slot>
				</div>

				<slot :data="dataList" name="content" class="sadas" />

				<slot name="nullstate" :isFirstLoad="isFirstLoad!" :data="dataList!">
					<div v-if="!isFirstLoad && dataList.length == 0">暂无数据</div>
				</slot>

				<slot name="loadmore">
					<!-- #ifdef MP-WEIXIN -->
					<LoadMore v-if="!noMore && !dropDownStatus && !isFirstLoad && dataList?.length >= 10" />
					<!-- #endif -->
					<!-- #ifdef MP-ALIPAY -->
					<LoadMore v-if="!noMore && !isFirstLoad" />
					<!-- #endif -->
				</slot>

				<div class="h-16px" />
			</scroll-view>
		</template>
	</div>
</template>

<style scoped lang="less">
.paging {
	display: flex;
	flex-direction: column;
	height: 100%;
}
</style>
