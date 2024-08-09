<script lang="ts" setup>
const props = withDefaults(
	defineProps<{
		height?: number;
		content: string | string[];
		leftIcon?: string;
		rightIcon?: string;
		speed?: number;
		isArrowIcon?: boolean;
		bgColor?: string;
		color?: string;
	}>(),
	{
		height: 28,
		rightIcon: "i-material-symbols-double-arrow-rounded",
		leftIcon: "i-basil-bullhorn-solid",
		speed: 50,
		isArrowIcon: true,
		bgColor: "linear-gradient(13deg,#328EFE 0%,#ECF7F7 100%)",
		color: "#ffffff",
	}
);

const style = $computed(() => {
	return {
		"--height-size": `${props?.height * 2}rpx`,
		"--icon-width-size": `${props?.height * 2}rpx`,
		"--icon-height-size": `${props?.height * 2}rpx`,
	};
});

// 容器宽度
let containerWidth = $ref<number>(0);
// 内容宽度
let contentWidth = $ref<any[]>([]);
// 计算比例
let proportion = $ref();
onMounted(async () => {
	const { getSelectorNodeInfo, getSelectorNodeInfos } = useSelectorQuery();
	// 获取容器宽度
	const result = await getSelectorNodeInfo(".gy-noticebar-content");
	// 获取元素宽度
	const content = await getSelectorNodeInfos(".gy-noticebar-content-item");

	containerWidth = result.width || 0;
	contentWidth = content.map(item => item?.width) || [];

	contentMovement();
});

// 初始化位置
let noticebarStyle = $ref<{
	transform: string;
	animationDuration?: string;
	animation?: string;
}>({
	transform: "translate3d(0,0,0)",
});
// 列表默认index
let current = $ref(0);
// 定时器
let timer: NodeJS.Timeout;
const contentMovement = async () => {
	if (props?.content instanceof String) {
		const width = contentWidth[0];
		const difference = containerWidth - width;
		const duration = width / props?.speed;

		if (difference > 0) {
			noticebarStyle = {
				transform: "translate3d(0%,0,0)",
				animation: "none",
			};
		} else {
			noticebarStyle = {
				animationDuration: `${duration}s`,
				transform: "translate3d(0,0,0)",
			};
		}
	} else {
		const width = contentWidth[current];
		const difference = containerWidth - width;
		const duration = width / props?.speed;
		if (difference > 0) {
			noticebarStyle = {
				transform: "translate3d(0,0,0)",
				animation: "none",
			};
		} else {
			noticebarStyle = {
				animationDuration: `${duration}s`,
				transform: "translate3d(0,0,0)",
			};
		}
		if (timer) clearInterval(timer);

		timer = setInterval(() => {
			current = current == props?.content.length - 1 ? 0 : current + 1;
			noticebarStyle = {
				transform: "translate3d(0,0,0)",
			};
			contentMovement();
		}, duration * 1000);
	}
};

const isArray = arr => {
	return Array.isArray(arr);
};

const onCharge = e => {
	clearInterval(timer);
	current = current == props?.content.length - 1 ? 0 : e.detail.current;
};

const onAnimationfinish = () => {
	contentMovement();
};
</script>

<template>
	<div class="gy-noticebar" :style="{ ...style, background: bgColor }">
		<div class="gy-noticebar-icon">
			<GyIcon :name="props?.leftIcon" :color="color" :size="height - 8" />
		</div>
		<div class="gy-noticebar-content">
			<template v-if="isArray(content)">
				<swiper
					class="gy-noticebar-content-list"
					:current="current"
					vertical
					@change="onCharge"
					@animationfinish="onAnimationfinish"
				>
					<swiper-item v-for="(item, index) in content" :key="index" class="gy-noticebar-content-list">
						<div
							class="gy-noticebar-content-item"
							:class="{
								'gy-noticebar-content-item-infinite': current == index,
							}"
							:style="{
								fontSize: `${(height * 0.55).toFixed(2)}px`,
								color,
								transform: current == index ? noticebarStyle?.transform : 'translate3d(0,0,0)',
								animationDuration: current == index ? noticebarStyle?.animationDuration : 'none',
								opacity: current == index ? 1 : 0.8,
							}"
						>
							{{ item }}
						</div>
					</swiper-item>
				</swiper>
			</template>
			<div
				v-else
				class="gy-noticebar-content-item gy-noticebar-content-item-infinite"
				:style="{
					...noticebarStyle,
					fontSize: `${height * 0.6}px`,
					color,
				}"
			>
				{{ props?.content }}
			</div>
		</div>
		<div v-if="isArrowIcon" class="gy-noticebar-icon">
			<GyIcon :name="props?.rightIcon" :color="color" :size="height - 8" />
		</div>
	</div>
</template>

<style scoped lang="less">
.gy-noticebar {
	display: grid;
	grid-template-columns: max-content 1fr max-content;
	align-items: center;
	height: var(--height-size);
	padding: 0 4px;
	border-radius: 6px;
	gap: 4px;

	&-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--icon-width-size);
		height: var(--icon-height-size);
	}

	&-content {
		width: 100%;
		height: var(--height-size);
		overflow: hidden;
		transition: all 0.5s;

		&-list {
			display: flex;
			flex-direction: column;
			height: var(--height-size);
			transition: all 0.5s;
		}

		&-item {
			width: fit-content;
			color: #fff;
			font-size: 14px;
			font-weight: 600;
			line-height: var(--height-size);
			white-space: nowrap;

			&-infinite {
				@keyframes notice-bar-play-infinite {
					100% {
						transform: translate3d(-100%, 0, 0);
					}
				}

				animation: notice-bar-play-infinite linear infinite both running;
				animation-delay: 1s;
			}
		}
	}
}
</style>
