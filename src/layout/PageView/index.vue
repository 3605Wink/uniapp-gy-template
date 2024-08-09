<script lang="ts" setup>
import Paging from "@/components/Paging/index.vue";
const pagingRef = ref<InstanceType<typeof Paging>>();
const {
	headerTitle,
	headerColor = "#191919",
	headerBgColor = "transparent",
	isHeader = false,
	navPosition = "sticky",
	type = "custom",
	func,
	refresherEnabled = false,
	scrollWithAnimation = true,
	refresherDefaultStyle = "none",
	background = "#f5f6f7",
	defaultStyle = {},
	modelValue,
	manual = false,
	method = "GET",
} = defineProps<{
	headerTitle?: string;
	headerColor?: string;
	headerBgColor?: string;
	isHeader?: boolean;
	navPosition?: "fixed" | "sticky";
	background?: string;
	refresherEnabled?: boolean;
	scrollWithAnimation?: boolean;
	refresherDefaultStyle?: "black" | "white" | "none";
	type: "list" | "custom";
	func?: (...args: any[]) => Promise<any>;
	defaultStyle?: {
		[key: string]: any;
	};
	modelValue?: any;
	manual?: boolean;
	method?: "GET" | "POST";
}>();

const emits = defineEmits(["load", "refresh"]);
const capsuleInfo = uni.getMenuButtonBoundingClientRect();
const headerHeight = $computed(() => {
	if (navPosition == "fixed") return 0;
	else return capsuleInfo.height + 8 + capsuleInfo.top;
});

let show = $ref(false);
let route = getCurrentPages();
const routeData = $computed(() => {
	return getPageView(route);
});
const currentRoute = $computed(() => {
	return route[route.length - 1].route;
});

let scrollHeight = $ref<number | undefined>();

onMounted(async () => {
	const res = await useRectMult([".page-view", ".header", ".footer"]);
	scrollHeight = res[0]?.height! - (res[1] == null ? 0 : res[1]?.height!) - (res[2] == null ? 0 : res[2]?.height!);
});

// 防止在短时间内多次执行方法
const isOperationInProgress = ref(false);
// 下拉刷新状态
let dropDownStatus = ref<boolean>(false);
// 触底加载更多
const bottomLoadMore = () => {
	if (isOperationInProgress.value) return;
	isOperationInProgress.value = true;
	setTimeout(() => {
		isOperationInProgress.value = false;
		emits("load");
	}, 500);
};

// 下拉刷新
const dropDownRefresh = () => {
	if (isOperationInProgress.value) return;
	isOperationInProgress.value = true;
	setTimeout(() => {
		dropDownStatus.value = false;
		isOperationInProgress.value = false;
		emits("refresh");
	}, 1000);
};

// 触发下拉
const triggerPullDown = e => {
	if (e.detail.dy >= 20) dropDownStatus.value = true;
};

const run = (params?) => {
	return pagingRef.value?.run(params) || null;
};
const refresh = () => pagingRef.value?.refresh() || null;

defineExpose({
	run,
	refresh,
	height: capsuleInfo?.height + capsuleInfo?.top + 8,
});
</script>

<template>
	<div class="page-view" :style="defaultStyle">
		<!-- <slot name="menu">
			<popup v-model="show" :height="`calc(100vh - ${isHeader ? headerHeight : 0}px - 128rpx)`">
				<div class="grid gap-12px">
					<vCard
						v-for="(item, index) in routeData"
						:key="index"
						:index="index"
						:item="item"
						:current="currentRoute == item?.path"
						:total="routeData.length"
					/>
				</div>
			</popup>
		</slot> -->

		<div class="header">
			<slot name="header" :height="capsuleInfo?.height + capsuleInfo?.top + 8">
				<GyNavBar
					v-if="isHeader"
					:title="headerTitle || ''"
					:color="headerColor"
					:background="headerBgColor"
					:position="navPosition"
				/>
			</slot>
		</div>

		<template v-if="type == 'custom'">
			<!-- #ifdef MP-WEIXIN -->
			<scroll-view
				:style="{
					'height': `${scrollHeight}px`,
					'flex-grow': 1,
				}"
				:enabled="true"
				:scroll-y="true"
				:scroll-top="0"
				:refresher-enabled="refresherEnabled"
				:refresher-default-style="refresherDefaultStyle"
				:scroll-anchoring="true"
				:scroll-with-animation="scrollWithAnimation"
				:refresher-background="background"
				:refresher-triggered="dropDownStatus"
				@refresherrefresh="dropDownRefresh"
				@refresherpulling="triggerPullDown"
				@scrolltolower="bottomLoadMore"
			>
				<template #refresher>
					<div style="display: flex; justify-content: center; width: 100%">
						<slot name="refresher">
							<Loader />
						</slot>
					</div>
				</template>

				<slot />
			</scroll-view>
			<!-- #endif -->

			<!-- #ifdef MP-ALIPAY -->
			<slot />
			<!-- #endif -->
		</template>
		<template v-else-if="scrollHeight">
			<Paging
				ref="pagingRef"
				:func="func!"
				:height="scrollHeight"
				v-model="modelValue"
				:manual="manual"
				:method="method"
			>
				<template #content="{ data }">
					<slot :data="data" />
				</template>
			</Paging>
		</template>

		<div class="footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<style scoped lang="less">
.page-view {
	width: 100%;
	height: 100vh;
	background: #f6f7f8;

	&-content {
		position: relative;
		overflow: scroll;
		background: #f6f7f8;
	}
	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
}
</style>
