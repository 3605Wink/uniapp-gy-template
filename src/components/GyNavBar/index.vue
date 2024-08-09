<script lang="ts" setup>
const {
	title,
	background = "#ffffff",
	color = "#fff",
	position = "fixed",
	shadow = false,
} = defineProps<{
	title: string;
	color?: string;
	background?: string;
	position?: string;
	shadow?: boolean;
}>();
const emits = defineEmits(["open"]);
interface PageRoute {
	route: string;
}
// 定义页面实例数组类型
type PageInstances = (Page.PageInstance<AnyObject, PageRoute> & PageRoute)[];
const pages: PageInstances = getCurrentPages();
const capsuleInfo = uni.getMenuButtonBoundingClientRect();
// alipay导航栏头部
// #ifdef MP-ALIPAY
const navInfo = my.getLeftButtonsBoundingClientRect();

// #endif

const returnToThePreviousPage = () => {
	if (pages.length == 1) {
		uni.switchTab({ url: "/pages/home/index" });
	} else {
		uni.navigateBack({
			delta: 1,
		});
	}
};

const routeSet = $computed(() => {
	if (pages.length == 1) return "i-solar-home-smile-angle-bold";
	else return "i-ep-arrow-left-bold";
});
const open = () => {
	emits("open");
};

const style = $computed(() => {
	let style;
	// #ifdef MP-WEIXIN
	style = { width: "calc(100% - 48rpx)", paddingRight: `24rpx`, paddingLeft: `24rpx` };
	// #endif

	// #ifdef MP-ALIPAY
	style = {
		paddingLeft: `${navInfo.backButtonIcon.left}px`,
		width: `calc(100% - ${navInfo.backButtonIcon.left * 2}px)`,
		paddingRight: `${navInfo.backButtonIcon.left}px`,
	};
	// #endif
	return style;
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
		class="header"
		:style="{
			paddingTop: `${capsuleInfo.top}px`,
			height: `${capsuleInfo.height}px`,
			background,
			position,
			paddingBottom: '8px',
			...style,
		}"
	>
		<slot>
			<!-- #ifdef MP-WEIXIN -->
			<div
				class="header-menu"
				:style="{
					width: `${capsuleInfo.width / 2}px`,
					height: `${capsuleInfo.height}px`,
				}"
				@click="returnToThePreviousPage"
			>
				<GyIcon color="#ffffff" :name="routeSet" :size="routeSet == 'i-solar-home-smile-angle-bold' ? 18 : 14" />
			</div>
			<!-- #endif -->

			<!-- #ifdef MP-ALIPAY -->
			<div
				class="header-menu"
				:style="{
					width: `${navInfo.backButtonIcon.width}px`,
					height: `${navInfo.backButtonIcon.height}px`,
				}"
				@click="returnToThePreviousPage"
			></div>
			<!-- #endif -->
			<div class="header-title" :style="{ color, textShadow: shadow ? '0 0 2px rgba(0, 0, 0, 0.5)' : 'none' }">
				{{ title }}
			</div>

			<div
				:style="{
					width: `${capsuleInfo.width / 2}px`,
					height: `${capsuleInfo.height}px`,
				}"
			/>
		</slot>
	</div>
</template>

<style scoped lang="less">
.header {
	display: grid;
	position: fixed;
	z-index: 9999999;
	top: 0;
	left: 0;
	grid-template-columns: max-content 1fr max-content;
	place-items: center center;

	transition: background 0.5s;
	background-size: cover !important;

	&-menu {
		display: grid;
		grid-template-columns: max-content;
		place-content: center;
		align-items: center;
		width: fit-content;
		border-radius: 24px;
		background-color: rgb(0 0 0 / 30%);
		backdrop-filter: blur(10px);
		gap: 6px;
	}

	&-title {
		transition: all 0.5s;
		font-size: 16px;
		font-weight: 600;
		line-height: 1;
		text-align: center;
	}
}
</style>
